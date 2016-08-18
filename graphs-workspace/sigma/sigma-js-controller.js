angular.module('sigmajs-ng')

  .controller('MyCtrl', ['$scope', function MyCtrl($scope) {
    $scope.sigmaGraph = {
      "nodes": [
        {
          "id": "n0",
          "label": "A node",
          // "x": 0,
          // "y": 0,
          "size": 3
        },
        {
          "id": "n1",
          "label": "Another node",
          // "x": 3,
          // "y": 1,
          "size": 2
        },
        {
          "id": "n2",
          "label": "And a last one",
          // "x": 1,
          // "y": 3,
          "size": 1
        }
      ],
      "edges": [
        {
          "id": "e0",
          "source": "n0",
          "target": "n1"
        },
        {
          "id": "e1",
          "source": "n1",
          "target": "n2"
        },
        {
          "id": "e2",
          "source": "n2",
          "target": "n0"
        }
      ]
    }

    $scope.addNode = function () {
      var node = {
        "id": "n" + ($scope.sigmaGraph.nodes.length),
        "label": "Node" + ($scope.sigmaGraph.nodes.length + 1),
        "x": $scope.sigmaGraph.nodes.length,
        "y": $scope.sigmaGraph.nodes.length,
        "size": $scope.sigmaGraph.nodes.length
      };

      $scope.sigmaGraph.nodes.push(node);
    };

    $scope.addEdge = function () {
      var edge = {
        "id": "e"+ ($scope.sigmaGraph.edges.length),
        "source": '',
        "target": ''
      };

      $scope.sigmaGraph.edges.push(edge);
    };
  }]);