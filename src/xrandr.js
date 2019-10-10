const CONNECTED_REGEX = /^(\S+) connected (?:(\d+)x(\d+))?/;
const POSITION_REGEX = /\s+(\d+)x([0-9i]+)\+(\d+)\+(\d+)\s+/;
const DISCONNECTED_REGEX = /^(\S+) disconnected/;
const MODE_REGEX = /^\s+(\d+)x([0-9i]+)\s+((?:\d+\.)?\d+)([*+ ]?)([+* ]?)/;
const ROTATION_LEFT = /^([^(]+) left \((?:(\d+)x(\d+))?/;
const ROTATION_RIGHT = /^([^(]+) right \((?:(\d+)x(\d+))?/;
const ROTATION_INVERTED = /^([^(]+) inverted \((?:(\d+)x(\d+))?/;

const VERBOSE_MODE_REGEX = /^\s*(\d+)x([0-9i]+)\s+(?:\(0x[0-9a-f]+\)\.)?\s*([0-9.]+MHz)?\s*(\+HSync)?\s*(\+VSync)?\s*(\*current)?\s*(\+preferred)?/;
const VERBOSE_VERT_MODE_REGEX = /^\s+v:\s+height.+clock\s+([0-9.]+)Hz/;
const VERBOSE_ANY_LINE_REGEX = /^\s+[^\n]*/;
const VERBOSE_EDID_START_LINE = /^\s+EDID:/;
const VERBOSE_EDID_NEXT_LINE = /^\s+([0-f]{32})/;
const VERBOSE_ROTATION_LEFT = /^[^(]+\([^(]+\) left \(/;
const VERBOSE_ROTATION_RIGHT = /^[^(]+\([^(]+\) right \(/;
const VERBOSE_ROTATION_INVERTED = /^[^(]+\([^(]+\) inverted \(/;


function xrandrParser(input, options = {}) {
  let strInput = input;
  const parseOptions = {verbosedInput: false, ...options};
  if (Buffer.isBuffer(input)) {
    strInput = input.toString();
  }
  const lines = strInput.split('\n');
  const result = {};
  let mode = {};
  let lastInterface;
  let startParseEdid;

  lines.forEach((line) => {
    let parts;
    if (CONNECTED_REGEX.test(line)) {
      parts = CONNECTED_REGEX.exec(line);
      result[parts[1]] = {
        connected: true,
        modes: [],
        rotation: 'normal'
      };
      if (parts[2] && parts[3]) {
        result[parts[1]].width = parseInt(parts[2], 10);
        result[parts[1]].height = parseInt(parts[3], 10);
      }
      if (!parseOptions.verbosedInput) {
        if (ROTATION_LEFT.test(line)) {
          result[parts[1]].rotation = 'left';
        } else if (ROTATION_RIGHT.test(line)) {
          result[parts[1]].rotation = 'right';
        } else if (ROTATION_INVERTED.test(line)) {
          result[parts[1]].rotation = 'inverted';
        }
      } else {
        if (VERBOSE_ROTATION_LEFT.test(line)) {
          result[parts[1]].rotation = 'left';
        } else if (VERBOSE_ROTATION_RIGHT.test(line)) {
          result[parts[1]].rotation = 'right';
        } else if (VERBOSE_ROTATION_INVERTED.test(line)) {
          result[parts[1]].rotation = 'inverted';
        }
      }

      const position = POSITION_REGEX.exec(line);
      if (position) {
        result[parts[1]].position = {
          x: parseInt(position[3], 10),
          y: parseInt(position[4], 10)
        };
      }

      lastInterface = parts[1];
    } else if (DISCONNECTED_REGEX.test(line)) {
      parts = DISCONNECTED_REGEX.exec(line);
      result[parts[1]] = {
        connected: false,
        modes: []
      };
      lastInterface = parts[1];
    } else if (!parseOptions.verbosedInput && lastInterface && MODE_REGEX.test(line)) {
      parts = MODE_REGEX.exec(line);
      mode = {
        width: parseInt(parts[1], 10),
        height: parseInt(parts[2], 10),
        rate: parseFloat(parts[3])
      };
      if (/^[0-9]+i$/.test(parts[2])) mode.interlaced = true;
      if (parts[4] === '+' || parts[5] === '+') mode.native = true;
      if (parts[4] === '*' || parts[5] === '*') mode.current = true;
      result[lastInterface].modes.push(mode);
    } else if (parseOptions.verbosedInput && lastInterface && VERBOSE_MODE_REGEX.test(line)) {
      parts = VERBOSE_MODE_REGEX.exec(line);
      mode = {
        width: parseInt(parts[1], 10),
        height: parseInt(parts[2], 10)
      };
      if (/^[0-9]+i$/.test(parts[2])) mode.interlaced = true;
      if (line.includes('+preferred')) mode.native = true;
      if (line.includes('*current')) mode.current = true;
    } else if (parseOptions.verbosedInput && lastInterface && mode && VERBOSE_VERT_MODE_REGEX.test(line)) {
      parts = VERBOSE_VERT_MODE_REGEX.exec(line);
      mode.rate = parseFloat(parts[1]);
      result[lastInterface].modes.push(mode);
      mode = null;
    } else if (parseOptions.verbosedInput && lastInterface && VERBOSE_EDID_START_LINE.test(line)) {
      startParseEdid = true;
      result[lastInterface].edid = '';
    } else if (startParseEdid && parseOptions.verbosedInput && lastInterface && VERBOSE_EDID_NEXT_LINE.test(line)) {
      parts = VERBOSE_EDID_NEXT_LINE.exec(line);
      result[lastInterface].edid += parts[1];
    } else if (parseOptions.verbosedInput && lastInterface && VERBOSE_ANY_LINE_REGEX.test(line)) {
      if (startParseEdid) {
        startParseEdid = false;
      }
    } else {
      lastInterface = null;
    }
  });
  return result;
}

export {
  xrandrParser as parser,
  xrandrParser as default
};
