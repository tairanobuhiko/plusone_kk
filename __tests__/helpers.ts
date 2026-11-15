type IOCallback = (
  entries: { isIntersecting: boolean; target: Element }[]
) => void;

// jsdom には IntersectionObserver が無いため、テストから「画面に入った」合図を送れる代わりの部品を置く
class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: IOCallback;
  targets: Element[] = [];
  constructor(callback: IOCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe(target: Element) {
    this.targets.push(target);
  }
  unobserve() {}
  disconnect() {
    this.targets = [];
  }
}

export function resetViewport() {
  MockIntersectionObserver.instances = [];
  (globalThis as any).IntersectionObserver = MockIntersectionObserver;
}

// 監視中の要素すべてに「画面に入った」と知らせる
export function enterViewport() {
  MockIntersectionObserver.instances.forEach((io) =>
    io.callback(io.targets.map((target) => ({ isIntersecting: true, target })))
  );
}

// OS の「視差効果を減らす」設定の有無を切り替える
export function setReducedMotion(reduced: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: reduced && query.includes("prefers-reduced-motion"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
}
