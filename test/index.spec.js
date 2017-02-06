import fs from 'fs';
import expect from 'expect';
import {parser} from '../src/xrandr';

describe('parser', () => {
  // Fetch fixtures
  const buffer1 = fs.readFileSync(`${__dirname}/fixtures/input1.txt`);
  const buffer2 = fs.readFileSync(`${__dirname}/fixtures/input1.txt`);
  const buffer3 = fs.readFileSync(`${__dirname}/fixtures/input3.txt`);
  const buffer4 = fs.readFileSync(`${__dirname}/fixtures/input4.txt`);
  const buffer5 = fs.readFileSync(`${__dirname}/fixtures/input5.txt`);
  const buffer6 = fs.readFileSync(`${__dirname}/fixtures/input6.txt`);
  const buffer7 = fs.readFileSync(`${__dirname}/fixtures/input7.txt`);
  const expected1 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output1.json`).toString());
  const expected3 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output3.json`).toString());
  const expected4 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output4.json`).toString());
  const expected5 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output5.json`).toString());
  const expected6 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output6.json`).toString());
  const expected7 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output7.json`).toString());

  it('should throw if no string is passed', () => {
    let value;
    try {
      value = parser(undefined);
    } catch (err) {
      expect(err).toBeA(Error);
      expect(value).toNotExist();
    }
  });

  it('should throw if buffer is passed', () => {
    let value;
    try {
      value = parser(buffer1);
    } catch (err) {
      expect(err).toBeA(Error);
      expect(value).toNotExist();
    }
  });

  it('should accept a string as argument', () => {
    let value;
    try {
      value = parser(buffer1.toString());
    } catch (err) {
      expect(err).toBeA(Error);
      expect(value).toNotExist();
    }
  });

  it('should properly parse the file input1.txt', () => {
    const value = parser(buffer1.toString());
    expect(value).toEqual(expected1);
  });

  it('should properly parse the file input2.txt', () => {
    const value = parser(buffer2.toString());
    expect(value).toEqual(expected1);
  });

  it('should properly parse the file input3.txt', () => {
    const value = parser(buffer3.toString());
    expect(value).toEqual(expected3);
  });

  it('should properly parse the file input4.txt', () => {
    const value = parser(buffer4.toString());
    expect(value).toEqual(expected4);
  });

  it('should properly parse the file input5.txt', () => {
    const value = parser(buffer5.toString());
    expect(value).toEqual(expected5);
  });

  it('should properly parse the file input6.txt', () => {
    const value = parser(buffer6.toString());
    expect(value).toEqual(expected6);
  });

  it('should properly parse the file input7.txt', () => {
    const value = parser(buffer7.toString());
    expect(value).toEqual(expected7);
  });
});
