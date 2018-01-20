import * as d3 from 'd3'

class Tree {

	static get MARGINS () {
		return {top: 20, right: 90, bottom: 30, left: 90}
	}
	static get TRANSITION_DURATION () {
		return 500
	}
	static get SPACING () {
		return 180
	}

	constructor (svgEl, branch, {width, height, slugSelectHandler}) {
		const svg = d3.select(svgEl)
		svg.attr('width', width)
		svg.attr('height', height)
		this.iterator = 0

		// Event handlers
		this._slugSelectHandler = slugSelectHandler

		this.svg = svg.append('g')
			.attr('id', 'root')
			.attr('transform', `translate(${Tree.MARGINS.left}, ${Tree.MARGINS.top})`)

		this.treeMap = d3.tree().size([height, width])
		this.root = d3.hierarchy(branch, b => this.getChildrenFromBranch(b))
		this.root.x0 = height / 2
		this.root.y0 = 0

		// Collapse after the second level
		// this.root.children.forEach((d) => this.collapse(d))
		this.update(this.root)
	}

	_normalizeNodes (nodes) {
		// Normalize for fixed-depth.
		nodes.forEach(node => {
			node.y = node.depth * Tree.SPACING

			// Evaluate branch for active state
			if (node.data && node.data._condition) {
				node.active = node.data.test()
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

		// Add Circle for the nodes
		nodeEnter.append('circle')
			.attr('class', d => d.children ? 'node has-children' : 'node')
			.attr('r', 1e-6)
			.on('click', node => { that._handleNodeClick(node) })

		// Add labels for the nodes
		nodeEnter.append('text')
			.attr('dy', '.35em')
			.attr('x', d => d.children || d._children ? -13 : 13)
			.attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
			.text(d => {
				return d.data && d.data._slug ? d.data._slug.renderContent() : '???'
			})
			.on('click', (node) => {
				this._handleSlugSelect(node)
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
			.attr('class', d => d.children ? 'has-children' : '')
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
			.attr('class', node => {
				return node.active ? 'link link-active' : 'link'
			})
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
		source = source || this.root
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

	evaluateBranches () {
		this.svg.selectAll('path.link')
			.attr('class', node => {
				node.active = node.data.test()
				return node.active ? 'link link-active' : 'link'
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
	_handleNodeClick (d) {
		if (d.children) {
			d._children = d.children
			d.children = null
		} else {
			d.children = d._children
			d._children = null
		}
		this.update(d)
	}
	_handleSlugSelect (node) {
		if (this._slugSelectHandler) {
			this._slugSelectHandler(node)
		}
	}
	diagonal (s, d) {
		return `M ${s.y} ${s.x}
			C ${(s.y + d.y) / 2} ${s.x},
				${(s.y + d.y) / 2} ${d.x},
				${d.y} ${d.x}`
	}
}

export default Tree
