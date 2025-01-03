// <inheritdoc cref ="IGenericStack"/>
export class GenericStack<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) 
    {
      //
    }  

    push(item: T): void {
      if (this.size() === this.capacity) {
        throw Error("Stack has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
  
    pop(): T | undefined 
    {
      return this.storage.pop();
    }
  
    peek(): T | undefined 
    {
      return this.storage[this.size() - 1];
    }
  
    size(): number 
    {
      return this.storage.length;
    }

    empty() : boolean 
    {
      return this.storage.length === 0;
    }

    clear(): void 
    {
      this.storage = [];
    }

    get clonedStorage() : T[]
    {
      return [...this.storage];
    }

    /**
     * Rotate the stack to bring a different element on the top
     * @param reverse the carousel direction. If reverse is true, then the stack is rotated upward
     */
    rotate(reverse : boolean) {
      if (reverse) this.storage.unshift(this.storage.pop() as T);
      else this.storage.push(this.storage.shift() as T);
    }
  }