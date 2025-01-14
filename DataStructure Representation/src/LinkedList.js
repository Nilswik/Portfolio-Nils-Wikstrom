class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
export class linkedlist {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  addFirst(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  addLast(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode; // if the list is empty then set new node ass head
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next; //go the last node
      }
      current.next = newNode;
    }
    this.size++;

  }
  removeLast(){
    if (!this.head) {
      return
    }
    if (!this.head.next) {
      this.head = null
    }else{
      let current = this.head
      while (current.next.next) {
        current = current.next;

      }
      current.next = null
    }
    this.size--;
  }

  removeFirst(){
    if(!this.head){
      return
    }
    let current = this.head
    this.head = this.head.next
    current = null
    this.size--;
  }

  printList() {
    let current = this.head;
    const result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    console.log(result.join('->'));
  }
  removeAtIndex(){
    console.log("remove at indexss")
  }
}

const ll = new linkedlist();
console.log(ll);

export function PopulateList() {
  const List = document.querySelector('.LinkedListContainer');
  if (List) {
    List.innerHTML = '';
    // Start at the head of the linked list
    let current = ll.head;
    let index = 0;
    while (current) {
      // Traverse until current becomes null
      const nodeContainer = document.createElement('div');
      nodeContainer.className = 'NodeContainer animate';
      nodeContainer.id = `NodeContainer${index}`;
      // Set the node's data as text
      nodeContainer.innerText = current.data;

      List.appendChild(nodeContainer);
      current = current.next; // Move to the next node
      index++;
    }
    console.log(List.innerHTML);
  }
}

//TODO:TILLS NÄSTA GÅNG
/**dessa funktioners ide är ju att när man lägger till en grej 
så ska den vara en färg så man ser vad som hänt 
kommer funka med knapparna som finns på sidan med onclicks är ju då iden*/
export function addFirst(newnode) {
  ll.addFirst(newnode);
  PopulateList();

  const list = document.querySelector('.Linkedlistcontainer');
  if (list) {
    const nodeContainer = document.createElement('div');
    nodecontainer.className = 'NodeContainer animate';
    nodecontainer.innerText = newnode;

    list.insertBefore(nodeContainer, list.firstChild);

    setTimeout(() => {
      nodecontainer.classList.remove('animate');
    }, 0.5);
  }
}

export function addLast(newnode) {
  ll.addLast(newnode);
  PopulateList();
}
let currentNode = null;
let intervalId = null;


function createArrowElement() {
  const arrowF = document.createElement('span');
  const arrowB = document.createElement('span');
  arrowF.innerText = '->'
  arrowB.innerText = '<-'
  arrowF.classList.add('arrow')
  arrowB.classList.add('arrow')
  return [arrowF,arrowB];
}
export function iterateForward() {
  const List = document.querySelector('.LinkedListContainer');
  if (List) {
    clearInterval(intervalId); // Clear any existing interval
    currentNode = List.firstChild;
    intervalId = setInterval(() => {
      if (currentNode) {
        currentNode.classList.remove('highlight');
        const arrow = currentNode.querySelector('.arrow');
        if (arrow) {
          currentNode.removeChild(arrow);
        }
        currentNode = currentNode.nextSibling;
      } else {
        clearInterval(intervalId);
        return;
      }
      if (currentNode) 
          currentNode.classList.add('highlight');
          const [arrowF] = createArrowElement();
          currentNode.appendChild(arrowF);
    }, 1000); // Change the interval time as needed
  }
}
export function iterateBackward() {
  const List = document.querySelector('.LinkedListContainer');
  if (List) {
    clearInterval(intervalId);
    currentNode = List.lastChild;
    intervalId = setInterval(() => {
      if (currentNode) {
        currentNode.classList.remove('highlight');
        const arrow = currentNode.querySelector('.arrow');
        if (arrow) {
          currentNode.removeChild(arrow);
        }
        currentNode = currentNode.previousSibling;
      }else{
        clearInterval(intervalId);
        return;
      }
      if (currentNode) 
        currentNode.classList.add('highlight')
        const [arrowB] = createArrowElement();
        currentNode.appendChild(arrowF);
    }, 1000);
  }
}
export function removeLast() {
  ll.removeLast()
  PopulateList()
}
export function removeAtIndex() {
  ll.removeAtIndex()
  PopulateList()
}

export function removeFirst(){
  ll.removeFirst()
  PopulateList()
}
