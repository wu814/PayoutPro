#include <iostream>
#include <vector>
#include <utility>

class MaxHeap {
 private:
  std::vector<std::pair<std::string, double>> heap;

  int parent(int i) { return (i - 1) / 2; }

  int left(int i) { return (2 * i + 1); }

  int right(int i) { return (2 * i + 2); }

  void heapify_up(int i) {
    while (i > 0 && heap[parent(i)].second < heap[i].second) {
      std::swap(heap[parent(i)], heap[i]);
      i = parent(i);
    }
  }

  void heapify_down(int i) {
    int max_index = i;
    int l = left(i);
    int r = right(i);

    if (l < heap.size() && heap[l].second > heap[max_index].second) max_index = l;
    if (r < heap.size() && heap[r].second > heap[max_index].second) max_index = r;

    if (i != max_index) {
      std::swap(heap[i], heap[max_index]);
      heapify_down(max_index);
    }
  }

 public:
  MaxHeap() {}

  void insert(std::string key, double value) {
    heap.push_back({key, value});
    heapify_up(heap.size() - 1);
  }

  std::pair<std::string, double> get_max() {
    if (heap.size() == 0) {
      std::cout << "Heap is empty" << std::endl;
      return {"", -1};
    }
    return heap[0];
  }

  std::pair<std::string, double> extract_max() {
    if (heap.size() == 0) {
      std::cout << "Heap is empty" << std::endl;
      return {"", -1};
    }
    std::pair<std::string, double> max = heap[0];
    heap[0] = heap.back();
    heap.pop_back();
    heapify_down(0);
    return max;
  }

  void print_heap() {
    for (auto i : heap) std::cout << i.first << ":" << i.second << " ";
    std::cout << std::endl;
  }

  // print list of people who owe money
  void print_loss() {
        for (auto i : heap) {
        std::cout << i.first << " owes $" << i.second;
        std::cout << std::endl;
    }
  }

  // print list of people who earn money
  void print_gain() {
    for (auto i : heap) {
      std::cout << i.first << " earns $" << i.second;
      std::cout << std::endl;
    }
  }
};

// 
void rearrange(MaxHeap& greater, MaxHeap& less) {
    greater.insert(greater.get_max().first, greater.get_max().second - less.get_max().second);
    greater.extract_max();

    less.insert(less.get_max().first, 0);
    less.extract_max();
}


int main() {
    MaxHeap loss;
    MaxHeap gain;
    
    std::string name;
    std::string chipStr;
    std::string buyStr;
    double chips;
    double buyIn;
    std::cout << "For each player, enter name, amount of chips, and total bought in seperated by space: \n";
    for (int i = 0; i < 8; i++) {
        std::cin >> name >> chipStr >> buyStr;
        try {
          chips = std::stod(chipStr);
          buyIn = std::stod(buyStr);
        } 
        catch (const std::invalid_argument& e) {
          std::cout << "Invalid input: " << e.what() << std::endl;
        }
        double net = chips - buyIn;
        if (name == "dick") {
            net = 0;
        }
        if (net > 0) {
            gain.insert(name, net);
        }
        else if (net < 0) {
            loss.insert(name, -1 * net);
        }
    }

    std::cout << '\n';

    loss.print_loss();
    std::cout << '\n';
    gain.print_gain();

    std::cout << '\n';

    while (gain.get_max().second != 0 && loss.get_max().second != 0) {
        // if highest earner is less than biggest loser
        if (gain.get_max().second < loss.get_max().second) {
            std::cout << loss.get_max().first << " pays " << gain.get_max().first << " $" << gain.get_max().second << '\n';
            rearrange(loss, gain);
        }

        //if highest earner is greater than or equal to biggest loser
        else {
            std::cout << loss.get_max().first << " pays " << gain.get_max().first << " $" << loss.get_max().second << '\n';
            rearrange(gain, loss);
        }
        
    }

    return 0;
}


