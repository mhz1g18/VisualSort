var elements = new Array(100).fill(Math.random() * 100);
const defColor = "#4286F4";
var speed = 50;

function changeSpeed(speedVar) {
  speed = 600 - speedVar;
  document.getElementById("speed").innerHTML =
    "speed is " + (((speedVar / 600) * 100).toFixed(2) + "%");
}

function recreateArray() {
  var len = elements.length;
  addDiv(len);
}

async function sortWithBubble() {
  var start = new Date().getTime();
  var x = await bubbleSort(elements);
  document.getElementById("timer").innerHTML =
    "time taken " + ((x - start) / 1000).toString();
}

async function bubbleSort(elements) {
  var len = elements.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (elements[j] > elements[j + 1]) {
        swap(elements, j, j + 1);

        var obj1 = document.getElementById(j.toString());
        var obj2 = document.getElementById((j + 1).toString());

        obj1.style.backgroundColor = "#32a871";
        obj2.style.backgroundColor = "#b80f33";

        swapElements(obj1, obj2);
        await sleep(speed);

        obj1.style.backgroundColor = defColor;
        obj2.style.backgroundColor = defColor;
      }
    }
    document.getElementById((len - 1 - i).toString()).style.backgroundColor =
      "#8659f7";
  }

  return new Date().getTime();
}

async function sortWithHeapSort() {
  var start = new Date().getTime();
  var x = await heapSort(elements);
  document.getElementById("timer").innerHTML =
    "time taken " + ((x - start) / 1000).toString();
}

async function heapSort(input) {
  array_length = input.length;

  for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
    heap_root(input, i);
  }

  for (i = input.length - 1; i > 0; i--) {
    swap(input, 0, i);
    var elementOne = document.getElementById("0");
    var elementTwo = document.getElementById(i.toString());
    elementTwo.style.backgroundColor = "#32a871";
    elementOne.style.backgroundColor = "#b80f33";
    swapElements(elementOne, elementTwo);
    await sleep(speed);
    elementOne.style.backgroundColor = "#8659f7";
    elementTwo.style.backgroundColor = defColor;
    array_length--;
    heap_root(input, 0);
  }

  document.getElementById("0").style.backgroundColor = "#8659f7";
  return new Date().getTime();
}

function heap_root(input, i) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = i;

  if (left < array_length && input[left] > input[max]) {
    max = left;
  }

  if (right < array_length && input[right] > input[max]) {
    max = right;
  }

  if (max != i) {
    swap(input, i, max);
    var elementOne = document.getElementById(max.toString());
    var elementTwo = document.getElementById(i.toString());
    swapElements(elementOne, elementTwo);
    heap_root(input, max);
  }
}

async function sortwithQuickSort() {
  var start = new Date().getTime();
  quickSort(elements, 0, elements.length - 1).then(function () {
    var y = new Date().getTime();
    document.getElementById("timer").innerHTML =
      "time taken " + (y - start) / 1000;
  });
}

async function quickSort(items, left, right) {
  var index;
  if (items.length > 1) {
    index = await partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(items, index, right);
    }
  }
}

async function partition(items, left, right) {
  var pivotIndex = Math.floor((right + left) / 2),
    pivot = items[pivotIndex],
    i = left, //left pointer
    j = right; //right pointer

  var pivotObj = document.getElementById(pivotIndex.toString()),
    leftObj = document.getElementById(i.toString()),
    rightObj = document.getElementById(j.toString());
  //"#32a871";
  //"#b80f33";

  leftObj.style.backgroundColor = "#32a871";
  rightObj.style.backgroundColor = "#b80f33";

  while (i <= j) {
    while (items[i] < pivot) {
      leftObj.style.backgroundColor = defColor;
      i++;
      leftObj = document.getElementById(i.toString());
      leftObj.style.backgroundColor = "#32a871";
    }
    while (items[j] > pivot) {
      rightObj.style.backgroundColor = defColor;
      j--;
      rightObj = document.getElementById(j.toString());
      rightObj.style.backgroundColor = "#b80f33";
    }
    if (i <= j) {
      swap(items, i, j); //swap two elements
      leftObj = document.getElementById(i.toString());
      rightObj = document.getElementById(j.toString());

      swapElements(leftObj, rightObj);
      await sleep(speed);
      i++;
      j--;
      leftObj = document.getElementById(i.toString());
      rightObj = document.getElementById(j.toString());
    }
  }

  leftObj.style.backgroundColor = "#8659f7";
  rightObj.style.backgroundColor = "#8659f7";
  pivotObj.style.backgroundColor = "#8659f7";
  return i;
}

function addDiv(numDivs) {
  const appBody = document.getElementById("appBody");
  elements = [];

  var width = 400 / numDivs;
  var margin = 80 / numDivs;

  if (margin < 1) margin = 1;

  var fontSize = 80 / numDivs;
  if (fontSize < 5) fontSize = 0;

  var random;

  while (appBody.firstChild) {
    appBody.removeChild(appBody.firstChild);
  }

  for (i = 0; i < numDivs; i++) {
    random = parseInt(Math.random() * 400);
    elements.push(random);
    var div = document.createElement("div");

    div.setAttribute("class", "arrayElement");
    div.setAttribute("id", i);

    div.style.width = width + "px";
    div.style.height = random + "px";
    div.style.marginLeft = margin + "px";
    div.style.marginRight = margin + "px";
    div.style.fontSize = fontSize + "px";
    div.innerHTML = random;
    /*
        To do: make elements attach at the bottom
        div.style.bottom = "0";
        div.style.position = "absolute";
        */

    document.getElementById("appBody").appendChild(div);
  }

  document.getElementById("numElements").innerHTML =
    "elements in the array " + numDivs.toString();
}

function swapElements(obj1, obj2) {
  var tempId = obj1.id;
  obj1.setAttribute("id", obj2.id);
  obj2.setAttribute("id", tempId);

  var temp = document.createElement("div");
  obj1.parentNode.insertBefore(temp, obj1);

  obj2.parentNode.insertBefore(obj1, obj2);

  temp.parentNode.insertBefore(obj2, temp);

  temp.parentNode.removeChild(temp);
}

function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

recreateArray();
