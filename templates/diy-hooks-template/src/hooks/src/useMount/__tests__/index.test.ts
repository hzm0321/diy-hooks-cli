import { renderHook } from '@testing-library/react-hooks';
import useMount from '../index';

const fn = jest.fn();

describe('useMount', () => {
  it('挂载阶段调用一次', () => {
    renderHook(() => useMount(fn));
    expect(fn).toBeCalledTimes(1);
  });

  it('卸载阶段不会被调用', () => {
    const { unmount } = renderHook(() => useMount(fn));
    expect(fn).toBeCalledTimes(1);
    unmount();
    expect(fn).toBeCalledTimes(1);
  });

  it('重新渲染阶段不会被调用', () => {
    const { rerender } = renderHook(() => useMount(fn));
    expect(fn).toBeCalledTimes(1);
    rerender();
    expect(fn).toBeCalledTimes(1);
  });
});
