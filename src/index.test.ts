import EventHub from './index';
describe('EventHub', () => {
  it('should be a class', () => {
    const eventHub = new EventHub();

    expect(eventHub).toBeInstanceOf(Object);
  });

  it('should have a on method', () => {
    const eventHub = new EventHub();

    expect(eventHub.on).toBeInstanceOf(Function);
  });

  it('should have a emit method', () => {
    const eventHub = new EventHub();

    expect(eventHub.emit).toBeInstanceOf(Function);
  });

  it('should trigger all callbacks when call the emit', () => {
    const eventHub = new EventHub();

    const callback = jest.fn();
    const callback2 = jest.fn();

    eventHub.on('test', callback);
    eventHub.on('test', callback2);
    eventHub.emit('test');

    expect(callback).toBeCalledTimes(1);
    expect(callback2).toBeCalledTimes(1);
  });

  it('should trigger callback with data when call the emit', () => {
    const eventHub = new EventHub();

    const callback = jest.fn();

    eventHub.on('test', callback);
    eventHub.emit('test', 'test string');

    expect(callback).toBeCalledWith('test string');
  });

  it('should unsubscribe the handler when call the off method', () => {
    const eventHub = new EventHub();

    const callback = jest.fn();

    eventHub.on('test', callback);
    eventHub.off('test', callback);
    eventHub.emit('test', 'test string');

    expect(callback).toBeCalledTimes(0);
  });

  it('should trigger nothing when eventName does not exist', () => {
    const eventHub = new EventHub();

    const callback = jest.fn();

    eventHub.on('test', callback);
    eventHub.emit('test1', 'test string');

    expect(callback).toBeCalledTimes(0);
  });

  it('should cancel nothing when eventName does not match', () => {
    const eventHub = new EventHub();

    const callback = jest.fn();

    eventHub.on('test', callback);
    eventHub.off('test1', callback);
    eventHub.emit('test', 'test string');

    expect(callback).toBeCalledTimes(1);
  });
});
