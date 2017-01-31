const CONNECTED_REGEX = /^(\S+) connected (?:(\d+)x(\d+))?/;
const DISCONNECTED_REGEX = /^(\S+) disconnected/;
const MODE_REGEX = /^\s+(\d+)x([0-9i]+)\s+((?:\d+\.)?\d+)([* ]?)([+ ]?)/;

function xrandrParser(input) {
  let strInput = input;
  if (Buffer.isBuffer(input)) {
    strInput = input.toString();
  }
  const lines = strInput.split('\n');
  const result = {};
  let mode = {};
  let lastInterface;

  lines.forEach((line) => {
    let parts;
    if (CONNECTED_REGEX.test(line)) {
      parts = CONNECTED_REGEX.exec(line);
      result[parts[1]] = {
        connected: true,
        modes: []
      };
      if (parts[2] && parts[3]) {
        result[parts[1]].width = parseInt(parts[2], 10);
        result[parts[1]].height = parseInt(parts[3], 10);
      }
      lastInterface = parts[1];
    } else if (DISCONNECTED_REGEX.test(line)) {
      parts = DISCONNECTED_REGEX.exec(line);
      result[parts[1]] = {
        connected: false,
        modes: []
      };
      lastInterface = parts[1];
    } else if (lastInterface && MODE_REGEX.test(line)) {
      parts = MODE_REGEX.exec(line);
      mode = {
        width: parseInt(parts[1], 10),
        height: parseInt(parts[2], 10),
        rate: parseFloat(parts[3], 10)
      };
      if (/^[0-9]+i$/.test(parts[2])) mode.interlaced = true;
      if (parts[4] === '+' || parts[5] === '+') mode.native = true;
      if (parts[4] === '*' || parts[5] === '*') mode.current = true;
      result[lastInterface].modes.push(mode);
    } else {
      lastInterface = null;
    }
  });
  return result;
}

export default xrandrParser;
