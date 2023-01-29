class MaxHeap {
    constructor() {
      this.heap = [];
    }
  
    parent(i) {
      return Math.floor((i - 1) / 2);
    }
  
    left(i) {
      return 2 * i + 1;
    }
  
    right(i) {
      return 2 * i + 2;
    }
  
    heapify_up(i) {
      while (i > 0 && this.heap[this.parent(i)][1] < this.heap[i][1]) {
        [this.heap[this.parent(i)], this.heap[i]] = [this.heap[i], this.heap[this.parent(i)]];
        i = this.parent(i);
      }
    }
  
    heapify_down(i) {
      let max_index = i;
      let l = this.left(i);
      let r = this.right(i);
  
      if (l < this.heap.length && this.heap[l][1] > this.heap[max_index][1]) max_index = l;
      if (r < this.heap.length && this.heap[r][1] > this.heap[max_index][1]) max_index = r;
  
      if (i !== max_index) {
        [this.heap[i], this.heap[max_index]] = [this.heap[max_index], this.heap[i]];
        this.heapify_down(max_index);
      }
    }
  
    insert(key, value) {
      this.heap.push([key, value]);
      this.heapify_up(this.heap.length - 1);
    }
  
    get_max() {
      if (this.heap.length === 0) {
        console.log("Heap is empty");
        return ["", -1];
      }
      return this.heap[0];
    }
  
    extract_max() {
      if (this.heap.length === 0) {
        console.log("Heap is empty");
        return ["", -1];
      }
      let max = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapify_down(0);
      return max;
    }
  
    print_heap() {
      console.log(this.heap.map(i => i[0] + ":" + i[1]).join(" ")); 
    }
  
    print_loss() {
      let stri = this.heap.map(i => i[0] + " owes $" + i[1]).join("\n");
      return stri;
    }
  
    print_gain() {
      let stri = this.heap.map(i => i[0] + " earns $" + i[1]).join("\n");
      return stri;
    }
  }


function rearrange(greater, less) {
    greater.insert(greater.get_max()[0], greater.get_max()[1] - less.get_max()[1]);
    greater.extract_max();
  
    less.insert(less.get_max()[0], 0);
    less.extract_max();
  }

  function main() {
    const loss = new MaxHeap();
    const gain = new MaxHeap();
  
    // // let chipStr;
    // // let buyStr;
    // console.log("For each player, enter name, amount of chips, and total bought in seperated by space: ");
    // const nameInput = document.getElementById(`nameInput${i}`);
    // const chipInput = document.getElementById(`chipInput${i}`);
    // const buyInput = document.getElementById(`buyInput${i}`);
    
    const nameArray = ["p1name", "p2name", "p3name", "p4name", "p5name", "p6name", "p7name", "p8name", ];
    const chipsArray = ["p1total", "p2total", "p3total", "p4total", "p5total", "p6total", "p7total", "p8total"];
    const buyInArray = ["p1worth", "p2worth", "p3worth", "p4worth", "p5worth", "p6worth", "p7worth", "p8worth"];
    
    

    // call to change each element
    for (let i = 0; i < 8; i++) {
        nameArray[i] = document.getElementById(nameArray[i]).value;
        chipsArray[i] = document.getElementById(chipsArray[i]).value;
        buyInArray[i] = document.getElementById(buyInArray[i]).value;
    }
    

    for (let i = 0; i < 8; i++) {
    //   try {
    //     chips = parseFloat(chipStr);
    //     buyIn = parseFloat(buyStr);
    //   } catch (e) {
    //     console.log(`Invalid input: ${e.message}`);
    //     process.exit(1);
    //   }
      let net = parseFloat(chipsArray[i]) - parseFloat(buyInArray[i]);
      if (nameArray[i] === "none") {
        net = 0;
      }
      if (net > 0) {
        gain.insert(nameArray[i], net);
      } 
      else if (net < 0) {
        loss.insert(nameArray[i], -1 * net);
      }
    }

    let summary = loss.print_loss() + "\n" + "\n" + gain.print_gain();
    console.log(summary);

    let trans = "";
    while (gain.get_max()[1] !== 0 && loss.get_max()[1] !== 0) {
      if ( gain.get_max()[1] < loss.get_max()[1]) {
        trans = trans + `${loss.get_max()[0]} pays ${gain.get_max()[0]} $${gain.get_max()[1]}` + "\n";
        rearrange(loss, gain);
      } 
      else {
        trans = trans + `${loss.get_max()[0]} pays ${ gain.get_max()[0]} $${loss.get_max()[1]}` + "\n";
        rearrange( gain, loss);
      }
    }
    console.log(trans);
  
    return 0;
  }
  
  


        