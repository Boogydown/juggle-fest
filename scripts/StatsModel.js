define( [
    ],
    function() {
        "use strict";

        function StatsModel ( statsStr ) {
            if ( statsStr)
                this.parseStr( statsStr );
        }

        StatsModel.prototype.parseStr = function( statsStr ) {
            var statsAry = statsStr.split( ' ' );
            function getVal( stat ) { return parseInt(stat.match(/[0-9]+/)[0]); }

            this.name = statsAry[1];
            this.index = getVal( this.name );
            this.h = getVal( statsAry[2] );
            this.e = getVal( statsAry[3] );
            this.p = getVal( statsAry[4] );
        };

        StatsModel.prototype.calculateRank = function( a, b ) {
            return a.h * b.h + a.e * b.e + a.p * b.p;
        };

        return StatsModel;
    }
);