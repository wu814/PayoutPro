# Poker Payout System

## Overview
This poker payout system is designed to help players keep track of their winnings and minimize the transactions needed to payout the winner(s). The system takes in player names, the total amount bought in, and the final chip amount, which can be entered into text boxes and submitted using a submit button. 

The system uses a combination of C++ and JavaScript on the backend, and HTML and CSS on the front end. The input data is collected and processed into nodes, which are then inserted into maximum binary heaps. The two heaps represent players who have a net gain and players who have a net loss. The system compares the two root nodes to simulate payment transactions and minimize the number of transactions needed to payout the winner(s).

## Usage
1. Enter the player names, total amount bought in, and final chip amount into the text boxes.
2. Click the submit button to process the data and calculate the transactions needed to payout the winner(s).
3. The system will display the transactions needed in a clear and concise format.

## Contributors
This poker payout system was created by Andrew Lin, Eric McGonagle, Daniel Querrey, and William Wu.

## License
This poker payout system is open source and released under the MIT License.

## Acknowledgements
We would like to acknowledge the use of maximum binary heaps in this project, as well as the HTML, CSS, JavaScript, and C++ programming languages.