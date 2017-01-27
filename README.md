# node-xrandr

An xrandr output parser

## Usage

```
import xrandrParser from 'xrandr';

exec('xrandr', (err, stdout) => {
  console.log(xrandrParser(stdout));
});
```

## Output

```
{
  "DP1": {
    "connected": false,
    "modes": []
  },
  "HDMI1": {
    "connected": true,
    "modes": [
      {
        "current": true,
        "native": true,
        "height": 1080,
        "rate": 60,
        "width": 1920
      },
      {
        "height": 1080,
        "rate": 60,
        "width": 1920,
        "interlaced": true
      },
      {
        "height": 1050,
        "rate": 60,
        "width": 1680
      }
    ]
  },
  "HDMI2": {
    "connected": false,
    "modes": []
  },
  "VIRTUAL1": {
    "connected": false,
    "modes": []
  }
}
```
