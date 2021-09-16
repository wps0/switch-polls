import { ToMinuteStringPipe } from './to-minute-string.pipe';

describe('ToMinuteStringPipe', () => {
  it('create an instance', () => {
    const pipe = new ToMinuteStringPipe();
    expect(pipe).toBeTruthy();
  });
});
