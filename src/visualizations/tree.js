import * as d3 from 'd3'

class Tree {

	static get MARGINS () {
		return {top: 20, right: 90, bottom: 30, left: 90}
	}
	static get TRANSITION_DURATION () {
		return 750
	}

	constructor (svgEl, branch, {width, height}) {
		const svg = d3.select(svgEl)
		svg.attr('width', width)
		svg.attr('height', height)
		this.iterator = 0

		this.svg = svg.append('g')
			.attr('id', 'root')
			.attr('transform', `translate(${Tree.MARGINS.left}, ${Tree.MARGINS.top})`)

		this.treeMap = d3.tree().size([height, width])
		this.root = d3.hierarchy(branch, b => this.getChildrenFromBranch(b))
		this.root.x0 = height / 2
		this.root.y0 = 0

		// Collapse after the second level
		this.root.children.forEach((d) => this.collapse(d))
		this.update(this.root)
	}

	_normalizeNodes (nodes) {
		// Normalize for fixed-depth.
		nodes.forEach(node => {
			node.y = node.depth * 180
			if (node.data && node.data._condition) {
				node.active = node.data._condition()
			} else {
				node.active = true
			}
		})
	}
	_getNewNodes (node, source) {
		const that = this
		const nodeEnter = node.enter().append('g')
			.attr('class', node => {
				return node.active ? 'node branch-active' : 'node'
			})
			.attr('transform', node => `translate(${source.y0}, ${source.x0})`)
			.on('click', node => { that.handleClick(node) })

		// Add Circle for the nodes
		const hasChildren = !!nodeEnter._children
		nodeEnter.append('circle')
			.attr('class', `node ${hasChildren ? 'has-children' : ''}`)
			.attr('r', 1e-6)

		// Add labels for the nodes
		nodeEnter.append('text')
			.attr('dy', '.35em')
			.attr('x', d => d.children || d._children ? -13 : 13)
			.attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
			.text(d => {
				return d.data && d.data._slug ? d.data._slug._content : '???'
			})
		return nodeEnter
	}
	_updateNodes (node, nodeEnter) {
		const nodeUpdate = nodeEnter.merge(node)

		// Transition to the proper position for the node
		nodeUpdate.transition()
			.duration(Tree.TRANSITION_DURATION)
			.attr('transform', d => `translate(${d.y}, ${d.x})`)

		// Update the node attributes and style
		nodeUpdate.select('circle.node')
			.attr('r', 10)
			.attr('class', d => d._children ? 'has-children' : '')
			.attr('cursor', 'pointer')
	}
	_exitNodes (node, source) {
		const nodeExit = node.exit().transition()
			.duration(Tree.TRANSITION_DURATION)
			.attr('transform', d => `translate(${source.y}, ${source.x})`)
			.remove()

		// On exit reduce the node circles size to 0
		nodeExit.select('circle')
			.attr('r', 1e-6)

		// On exit reduce the opacity of text labels
		nodeExit.select('text')
			.style('fill-opacity', 1e-6)
	}
	_getNewLinks (link, source) {
		const linkEnter = link.enter().insert('path', 'g')
			.attr('class', 'link')
			.attr('d', d => {
				const o = {x: source.x0, y: source.y0}
				return this.diagonal(o, o)
			})
		return linkEnter
	}
	_updateLinks (link, linkEnter) {
		const linkUpdate = linkEnter.merge(link)
		// Transition back to the parent element position
		linkUpdate.transition()
			.duration(Tree.TRANSITION_DURATION)
			.attr('d', d => this.diagonal(d, d.parent))
	}
	_exitLinks (link, source) {
		link.exit().transition()
			.duration(this.TRANSITION_DURATION)
			.attr('d', d => {
				const o = {x: source.x, y: source.y}
				return this.diagonal(o, o)
			})
			.remove()
	}

	update (source) {
		// Assigns the x and y position for the nodes
		const treeMap = this.treeMap(this.root)
		// Compute the new tree layout.
		const nodes = treeMap.descendants()
		const links = treeMap.descendants().slice(1)
		this._normalizeNodes(nodes)
		// Nodes
		const node = this.svg.selectAll('g.node')
			.data(nodes, d => d.id || (d.id = ++this.iterator))
		const nodeEnter = this._getNewNodes(node, source)
		this._updateNodes(node, nodeEnter, source)
		this._exitNodes(node, source)

		// Links
		const link = this.svg.selectAll('path.link')
			.data(links, d => d.id)

		const linkEnter = this._getNewLinks(link, source)
		this._updateLinks(link, linkEnter)
		this._exitLinks(link, source)

		// Store the old positions for transition.
		nodes.forEach(d => {
			d.x0 = d.x
			d.y0 = d.y
		})
	}

	getChildrenFromBranch (branch) {
		const slug = branch._slug || {}
		const fork = slug._fork || {}
		return fork._branches || []
	}
	collapse (d) {
		if (d.children) {
			d._children = d.children
			d._children.forEach(this.collapse)
			d.children = null
		}
	}
	handleClick (d) {
		if (d.children) {
			d._children = d.children
			d.children = null
		} else {
			d.children = d._children
			d._children = null
		}
		this.update(d)
	}
	diagonal (s, d) {
		return `M ${s.y} ${s.x}
			C ${(s.y + d.y) / 2} ${s.x},
				${(s.y + d.y) / 2} ${d.x},
				${d.y} ${d.x}`
	}
}

export default Tree
