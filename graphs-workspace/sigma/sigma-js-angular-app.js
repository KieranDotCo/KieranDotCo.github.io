(function () {
	'use strict';
	angular.module('sigmajs-ng', []).directive('sigmajs', function () {
		//over-engineered random id, so that multiple instances can be put on a single page
		var divId = 'sigmjs-dir-container-' + Math.floor((Math.random() * 999999999999)) + '-' + Math.floor((Math.random() * 999999999999)) + '-' + Math.floor((Math.random() * 999999999999));
		return {
			restrict: 'E',
			template: '<div id="' + divId + '" style="width: 100%;height: 100%;"></div>',
			scope: {
				//@ reads the attribute value, = provides two-way binding, & works with functions
				graph: '=',
				width: '@',
				height: '@',
				releativeSizeNode: '='
			},
			link: function (scope, element, attrs) {
				sigma.classes.graph.addMethod('neighbors', function (nodeId) {
					var k,
						neighbors = {},
						index = this.allNeighborsIndex[nodeId] || {};

					for (k in index)
						neighbors[k] = this.nodesIndex[k];

					return neighbors;
				});
				// Let's first initialize sigma:
				var s = new sigma({
					container: divId,
					settings: {
						defaultNodeColor: '#ec5148',
						labelThreshold: 4
					}
				});

				s.graph.nodes().forEach(function (n) {
					n.originalColor = n.color;
				});
				s.graph.edges().forEach(function (e) {
					e.originalColor = e.color;
				});

				// When a node is clicked, we check for each node
				// if it is a neighbor of the clicked one. If not,
				// we set its color as grey, and else, it takes its
				// original color.
				// We do the same for the edges, and we only keep
				// edges that have both extremities colored.
				s.bind('clickNode', function (e) {
					var nodeId = e.data.node.id,
						toKeep = s.graph.neighbors(nodeId);
					toKeep[nodeId] = e.data.node;


					if (e.data.node.active == true) {
						e.data.node.active = false;
						s.graph.nodes().forEach(function (n) {
							n.color = n.originalColor;
						});

						s.graph.edges().forEach(function (e) {
							e.color = e.originalColor;
						});
					} else {
						e.data.node.active = true;

						s.graph.nodes().forEach(function (n) {
							if (toKeep[n.id])
								n.color = n.originalColor;
							else
								n.color = '#eee';
						});

						s.graph.edges().forEach(function (e) {
							if (toKeep[e.source] && toKeep[e.target])
								e.color = e.originalColor;
							else
								e.color = '#eee';
						});
					}

					// Since the data has been modified, we need to
					// call the refresh method to make the colors
					// update effective.
					s.refresh();
				});

				// When the stage is clicked, we just color each
				// node and edge with its original color.
				s.bind('clickStage', function (e) {
					s.graph.nodes().forEach(function (n) {
						n.color = n.originalColor;
						n.active = false;
					});

					s.graph.edges().forEach(function (e) {
						e.color = e.originalColor;
					});

					// Same as in the previous event:
					s.refresh();
				});

				scope.$watch('graph', function (newVal, oldVal) {
					s.graph.clear();
					s.graph.read(scope.graph);
					s.refresh();
					if (scope.releativeSizeNode) {
						//this feature needs the plugin to be added
						sigma.plugins.relativeSize(s, 2);
					}
				}, true);

				scope.$watch('width', function (newVal, oldVal) {
					console.log("graph width: " + scope.width);
					element.children().css("width", scope.width);
					s.refresh();
					window.dispatchEvent(new Event('resize')); //hack so that it will be shown instantly
				});
				scope.$watch('height', function (newVal, oldVal) {
					console.log("graph height: " + scope.height);
					element.children().css("height", scope.height);
					s.refresh();
					window.dispatchEvent(new Event('resize'));//hack so that it will be shown instantly
				});

				element.on('$destroy', function () {
					s.graph.clear();
				});
			}
		};
	});
})();

