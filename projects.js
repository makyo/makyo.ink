const projects = [
    {id: 'Madison Scott-Clary', url: '/'},

    {id: 'Sawtooth', group: 'projects', url: '/sawtooth'},
    {id: 'The Fool', group: 'sawtooth', url: '/sawtooth/the-fool'},
    {id: 'Disappearance', group: 'sawtooth', url: '/sawtooth/disappearance'},
    {id: 'Party', group: 'sawtooth', url: '/sawtooth/party'},
    {id: 'Run Ragged', group: 'sawtooth', url: '/sawtooth/run-ragged'},
    {id: 'What Remains of Yourself', group: 'sawtooth', url: '/sawtooth/what-remains-of-yourself'},

    {id: '[adjective][species]', group: 'projects', url: '/adjspecies'},
    {id: 'Gender: Furry', group: 'adjspecies', url: '/adjspecies/gender-furry'},

    {id: 'Rum and Coke', group: 'projects', url: '/rum-and-coke'},
    {id: 'What I Expected', group: 'rum-and-coke', url: '/rum-and-coke/what-i-expected'},
    {id: 'How Many', group: 'rum-and-coke', url: '/rum-and-coke/how-many'},
    {id: 'Again', group: 'rum-and-coke', url: '/rum-and-coke/again'},
]

const links = [
    {source: 'Madison Scott-Clary', target: 'Sawtooth'},
    {source: 'Sawtooth', target: 'The Fool'},
    {source: 'Sawtooth', target: 'Disappearance'},
    {source: 'Sawtooth', target: 'Party'},
    {source: 'Sawtooth', target: 'Run Ragged'},
    {source: 'Sawtooth', target: 'What Remains of Yourself'},

    {source: 'Madison Scott-Clary', target: '[adjective][species]'},
    {source: '[adjective][species]', target: 'Gender: Furry'},

    {source: 'Madison Scott-Clary', target: 'Rum and Coke'},
    {source: 'Rum and Coke', target: 'What I Expected'},
    {source: 'Rum and Coke', target: 'How Many'},
    {source: 'Rum and Coke', target: 'Again'},
]

let svg = d3.select("svg.projects")
let width = +svg.attr("width")
let height = +svg.attr("height")

let simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-500))
    .force("center", d3.forceCenter(width / 2, height / 2))

let link = svg.append("g")
    .attr("class", "links")
  .selectAll("line")
  .data(links)
  .enter().append("line")

let node = svg.append("g")
    .attr("class", "nodes")
  .selectAll(".node")
  .data(projects)
  .enter().append("g")

node.append('circle')
    .attr('r', 10)
    .append("title")
    .text(d => d.id)

node.append('a')
    .attr('href', d => d.url)
    .append('text')
    .text(d => d.id)

simulation
    .nodes(projects)
    .on("tick", ticked)

simulation.force("link")
    .links(links);

function ticked() {
  link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)

  node
      .attr("transform", d => `translate(${d.x}, ${d.y})`)
}
