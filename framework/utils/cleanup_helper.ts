export class CleaupRegistry {
  private actions: Array<() => Promise<void>> = [];

  add(action: () => Promise<void>) {
    this.actions.push(action);
  }

  async run() {
    for (const action of this.actions.reverse()) await action();
  }
}
