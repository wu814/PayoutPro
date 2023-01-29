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
      while (i > 0 && this.heap[this.parent(i)].second < this.heap[i].second) {
        [this.heap[this.parent(i)], this.heap[i]] = [this.heap[i], this.heap[this.parent(i)]];
        i = this.parent(i);
      }
    }
  
    heapify_down(i) {
      let max_index = i;
      let l = this.left(i);
      let r = this.right(i);
  
      if (l < this.heap.length && this.heap[l].second > this.heap[max_index].second) max_index = l;
      if (r < this.heap.length && this.heap[r].second > this.heap[max_index].second) max_index = r;
  
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
  
    // print_heap() {
    //   console.log(this.heap.map(i => i.first + ":" + i.second).join(" ")); hello
    // }
  
    // print_loss() {
    //   console.log(this.heap.map(i => i.first + " owes $" + i.second).join("\n"));
    // }
  
    // print_gain() {
    //   console.log(this.heap.map(i => i.first + " earns $" + i.second).join("\n"));
    // }
  }


function rearrange(greater, less) {
    greater.insert(greater.get_max().first, greater.get_max().second - less.get_max().second);
    greater.extract_max();
  
    less.insert(less.get_max().first, 0);
    less.extract_max();
  }

  function main() {
    const loss = new MaxHeap();
    const gain = new MaxHeap();
  
    // let name;
    // // let chipStr;
    // // let buyStr;
    // let chips;
    // let buyIn;
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
    // let player1Name = document.getElementById("p1name").value;
    // let player1Chips = document.getElementById("p1total").value;
    // let player1BuyIn = document.getElementById("p1worth").value;
    
    // let player2Name = document.getElementById("p2name").value;
    // let player2Chips = document.getElementById("p2total").value;
    // let player2BuyIn = document.getElementById("p2worth").value;
    
    // let player3Name = document.getElementById("p3name").value;
    // let player3Chips = document.getElementById("p3total").value;
    // let player3BuyIn = document.getElementById("p3worth").value;
    
    // let player4Name = document.getElementById("p4name").value;
    // let player4Chips = document.getElementById("p4total").value;
    // let player4BuyIn = document.getElementById("p4worth").value;
    
    // let player5Name = document.getElementById("p5name").value;
    // let player5Chips = document.getElementById("p5total").value;
    // let player5BuyIn = document.getElementById("p5worth").value;
    
    // let player6Name = document.getElementById("p6name").value;
    // let player6Chips = document.getElementById("p6total").value;
    // let player6BuyIn = document.getElementById("p6worth").value;
    
    // let player7Name = document.getElementById("p7name").value;
    // let player7Chips = document.getElementById("p7total").value;
    // let player7BuyIn = document.getElementById("p7worth").value;
    
    // let player8Name = document.getElementById("p8name").value;
    // let player8Chips = document.getElementById("p8total").value;
    // let player8BuyIn = document.getElementById("p8worth").value;

    for (let i = 0; i < 8; i++) {
    //   try {
    //     chips = parseFloat(chipStr);
    //     buyIn = parseFloat(buyStr);
    //   } catch (e) {
    //     console.log(`Invalid input: ${e.message}`);
    //     process.exit(1);
    //   }
      let net = chipsArray[i] - buyInArray[i];
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
  
    //loss.printLoss();
    console.log("\n");
    //gain.printGain();
    console.log("\n"); 
  
    //while (gain.get_max().second !== 0 && loss.get_max().second !== 0) {
      if ( gain.get_max().second < loss.get_max().second) {
        console.log(`${loss.get_max().first} pays ${gain.get_max().first} $${ gain.get_max().second}`);
        rearrange(loss, gain);
      } 
      else {
        console.log(`${loss.get_max().first} pays ${ gain.get_max().first} $${loss.get_max().second}`);
        rearrange( gain, loss);
      }
    //}
  
    return 0;
  }
  
  


        