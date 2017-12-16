// Implement a 3-level node structure of parents and children using JavaScript. Each node should store the parent name and a list of children. Create some node data, then using this, represent the data as a tree structure on a web page. You should be able to collapse and expand the tree structure by clicking node names on the web page. You are allowed to use plain JavaScript or your favorite library.
let node = (name, parent) => {
  return {
    name,
    children: [],
    parent,
    width: 100,
    generation: 1
  };
}

let getChildren = (ray) => {
  ray.forEach((node, index) => {
    for(let i = index + 1 ; i < ray.length; i++) {
      if(Object.is(ray[i].parent, node)) {
        node.children.push(ray[i]);
      }
    }
  })
}

setGeneration = ray => {
  ray.forEach(node => {
    if(node.parent) {
      node.generation = node.parent.generation + 1;
    }
  });
}

setWidth = (ray) => {
  ray.forEach(node => {
    if(node.parent) {
      node.width = 100/node.parent.children.length;
    }
  });
}

setElementWidth = (ray) => {
  ray.forEach(node => {
    let width = node.width + '%';
    $(`.${node.name}-wrapper`).css('width', width);
    $(`.${node.name}-hidden`).css('width', width);
  });
}

makeFamilyTree = (member) => {
  htmlStr += `<div class="${member.name}-wrapper"> <h1 class="branch-line center">${member.parent ? '|' : ''}</h1><h${Math.min(member.generation,6)} class="center border pad-10 overflow-none name ${member.name}">${member.name }</h${Math.min(member.generation,6)}> <div class="flexer node">`;
  if(member.children.length > 0) {
    member.children.forEach(child => {
      makeFamilyTree(child);
    });
  }
  htmlStr += `</div></div><div class="${member.name}-hidden hidden"><h${Math.min(member.generation,6)} class="center pad-10">+</h${Math.min(member.generation,6)}></div>`;
  clickEventArray.push(member.name);
  return;
}

let nodeRay = [];

let clickEventArray = [];

let grandpa = node("Grandpa", null);
nodeRay.push(grandpa);
let mom = node("Mom", grandpa);
nodeRay.push(mom);
let uncleTed = node("Uncle-Ted", grandpa);
nodeRay.push(uncleTed);
let mike = node("Mike", mom);
nodeRay.push(mike);
let barb = node("Barb", mom);
nodeRay.push(barb);
let jeff = node("Jeff", uncleTed);
nodeRay.push(jeff);
let chrissy = node("Chrissy", uncleTed);
nodeRay.push(chrissy);
let jimmy = node("Jimmy", mom);
nodeRay.push(jimmy);

getChildren(nodeRay);
setWidth(nodeRay);
setGeneration(nodeRay);

let htmlStr = '';
makeFamilyTree(grandpa);

$('body').append(htmlStr);
setElementWidth(nodeRay);

clickEventArray.forEach(element => {
  $(`.${element}`).click((event)=> {
    event.stopPropagation();
    $(`.${element}`).parent().fadeOut(10);
    $(`.${element}-hidden`).fadeIn(10);
  });
  $(`.${element}-hidden`).click((event)=> {
    event.stopPropagation();
    $(`.${element}`).parent().fadeIn(10);
    $(`.${element}-hidden`).fadeOut(10);
  });
});
