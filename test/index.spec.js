import fs from 'fs';
import expect from 'expect';
import {parser} from '../src/xrandr';

describe('parser', () => {
  // Fetch fixtures
  const buffer1 = fs.readFileSync(`${__dirname}/fixtures/input1.txt`);
  const buffer2 = fs.readFileSync(`${__dirname}/fixtures/input2.txt`);
  const buffer3 = fs.readFileSync(`${__dirname}/fixtures/input3.txt`);
  const buffer4 = fs.readFileSync(`${__dirname}/fixtures/input4.txt`);
  const buffer5 = fs.readFileSync(`${__dirname}/fixtures/input5.txt`);
  const buffer6 = fs.readFileSync(`${__dirname}/fixtures/input6.txt`);
  const buffer7 = fs.readFileSync(`${__dirname}/fixtures/input7.txt`);
  const buffer8 = fs.readFileSync(`${__dirname}/fixtures/input8.txt`);
  const buffer9 = fs.readFileSync(`${__dirname}/fixtures/input9.txt`);
  const bufferVerbose1 = fs.readFileSync(`${__dirname}/fixtures/inputVerbose1.txt`);
  const bufferVerbose2 = fs.readFileSync(`${__dirname}/fixtures/inputVerbose2.txt`);
  const bufferVerbose3 = fs.readFileSync(`${__dirname}/fixtures/inputVerbose3.txt`);
  const bufferVerbose4 = fs.readFileSync(`${__dirname}/fixtures/inputVerbose4.txt`);
  const bufferVerbose5 = fs.readFileSync(`${__dirname}/fixtures/inputVerbose5.txt`);
  const bufferVerbose6 = fs.readFileSync(`${__dirname}/fixtures/inputVerbose6.txt`);
  const expected1 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output1.json`).toString());
  const expected2 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output2.json`).toString());
  const expected3 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output3.json`).toString());
  const expected4 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output4.json`).toString());
  const expected5 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output5.json`).toString());
  const expected6 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output6.json`).toString());
  const expected7 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output7.json`).toString());
  const expected8 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output8.json`).toString());
  const expected9 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/output9.json`).toString());
  const expectedVerbose1 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/outputVerbose1.json`).toString());
  const expectedVerbose2 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/outputVerbose2.json`).toString());
  const expectedVerbose3 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/outputVerbose3.json`).toString());
  const expectedVerbose4 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/outputVerbose4.json`).toString());
  const expectedVerbose5 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/outputVerbose5.json`).toString());
  const expectedVerbose6 = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/outputVerbose6.json`).toString());

  it('should throw if no string is passed', () => {
    let value;
    try {
      value = parser(undefined);
    } catch (err) {
      expect(err instanceof Error).toBe(true);
      expect(value).toBe(undefined);
    }
  });

  it('should throw if buffer is passed', () => {
    let value;
    try {
      value = parser(buffer1);
    } catch (err) {
      expect(err instanceof Error).toBe(true);
      expect(value).toNotExist();
    }
  });

  it('should accept a string as argument', () => {
    let value;
    try {
      value = parser(buffer1.toString());
    } catch (err) {
      expect(err instanceof Error).toBe(true);
      expect(value).toNotExist();
    }
  });

  it('should properly parse the file input1.txt', () => {
    const value = parser(buffer1.toString());
    expect(value).toEqual(expected1);
  });

  it('should properly parse the file input2.txt', () => {
    const value = parser(buffer2.toString());
    expect(value).toEqual(expected2);
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

  it('should properly parse the file input8.txt', () => {
    const value = parser(buffer8.toString());
    expect(value).toEqual(expected8);
  });

  it('should properly parse the file input9.txt', () => {
    const value = parser(buffer9.toString());
    expect(value).toEqual(expected9);
  });

  it('should properly parse the file inputVerbose1.txt', () => {
    const value = parser(bufferVerbose1.toString(), {verbosedInput: true});
    expect(value).toEqual(expectedVerbose1);
  });

  it('should properly parse the file inputVerbose2.txt', () => {
    const value = parser(bufferVerbose2.toString(), {verbosedInput: true});
    expect(value).toEqual(expectedVerbose2);
  });

  it('should properly parse the file inputVerbose3.txt', () => {
    const value = parser(bufferVerbose3.toString(), {verbosedInput: true});
    expect(value).toEqual(expectedVerbose3);
  });

  it('should properly parse the file inputVerbose4.txt', () => {
    const value = parser(bufferVerbose4.toString(), {verbosedInput: true});
    expect(value).toEqual(expectedVerbose4);
  });

  it('should properly parse the file inputVerbose5.txt', () => {
    const value = parser(bufferVerbose5.toString(), {verbosedInput: true});
    expect(value).toEqual(expectedVerbose5);
  });

  it('should properly parse the file inputVerbose6.txt', () => {
    const value = parser(bufferVerbose6.toString(), {verbosedInput: true});
    expect(value).toEqual(expectedVerbose6);
  });
});
