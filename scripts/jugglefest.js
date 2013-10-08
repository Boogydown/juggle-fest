require( [
    "BruteSortSolution",
    "SmartSortSolution"
    ],
    function( BruteSortSolution, SmartSortSolution ) {
        var dataFile = "data/jugglefest.txt";

        $("#bruteBtn").on( "click", function() { loadAndSolve( dataFile, BruteSortSolution ); } );
        $("#smartBtn").on( "click", function() { loadAndSolve( dataFile, SmartSortSolution ); } );

        function loadAndSolve( dataFile, SolutionClass ) {
            $("#solveTime").text("");
            $.ajax( {
                url: dataFile,
                dataType: "text",
                isLocal: true,
                success: function( data, textStatus, jqXHR ){
                    circuitStrs = data.match(/^C.*$/gm);
                    jugglerStrs = data.match(/^J.*$/gm);
                    var startTime = new Date().getTime();
                    var solution = new SolutionClass( $("#solution") );
                    solution.createModels( circuitStrs, jugglerStrs );

                    // allow browser to update page with our solution's announcement before hogging up CPU with solve()
                    setTimeout(function(){
                        solution.solve();
                        $("#solveTime").text( new Date().getTime() - startTime );
                    },100);
                }
            });
        }
    }
);