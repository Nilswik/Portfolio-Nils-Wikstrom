import './style.css';

import * as ll from './LinkedList';

document.querySelector('#app').innerHTML = `
  
  <div class="LinkedListContainer"></div>
    <div class="buttonContainer">
      <button id="addNodeFirst">Add Node First</button>
      <button id="addNodeLast">Add Node Last</button>
      <button id="iterateForward">Iterate Forward</button>
      <button id="iterateBackward">Iterate Backward</button>
      <button id="removeLast" >Remove Last</button>
      <button id="removeFirst">Remove First</button>
      <button id="removeAtIndex">Remove @ Index</button>
    </div>
`
;

document.getElementById('addNodeFirst').addEventListener('click', () => {
  const newNodeValue = prompt('enter a value for a new node');
  if (newNodeValue !== null) {
    ll.addFirst(newNodeValue);
  }
});
document.getElementById('addNodeLast').addEventListener('click', () => {
  const newNodeValue = prompt('enter a value for a new node');
  if (newNodeValue !== null) {
    ll.addLast(newNodeValue);
  }
});

document.getElementById('iterateForward').addEventListener('click', () => {
  ll.iterateForward();
  console.log('iterate forward pressed');
});

document.getElementById('iterateBackward').addEventListener('click', () => {
  ll.iterateBackward();
  console.log('iterate backwards pressed');
});

document.getElementById('removeLast').addEventListener('click', () => {
  ll.removeLast();
  console.log('Remove last was pressed');
});

document.getElementById('removeFirst').addEventListener('click', () => {
  ll.removeFirst();
  console.log('Remove first was pressed');
});
ll.PopulateList();
