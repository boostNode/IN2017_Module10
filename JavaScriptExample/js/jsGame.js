// **** Tic-Tac-Toe Script ****
// 
//	Author:			Troy Davis
//	Created:		Apr 04, 2017
//	Last revision:	Apr 05, 2017 (rev01)
//
// **** Tic-Tac-Toe Script ****

// DOM global variables
var NAMESPACE = NAMESPACE || {};

// instantiate Game
jQuery(document).ready(function () {
    NAMESPACE.Game.getInstance();
});

NAMESPACE.Game = (function() {

    //	Singleton Instance Reference (private)
    var _instance;

    //	Singleton Initializer (private)
    var Game = function() {

        // Singleton Class Definition (function declaration)
        //
        //     see: http://robdodson.me/javascript-design-patterns-singleton/

        // Private Member Variables
        var _privateMember = 'a private value that you can get with publicAccessor';
        var _gamePlayer = 'X'; // current player
        var _gameWinner = ''; // winning player ('X', 'O', 'DRAW')
        var _gameGridCellValue = ['', '', '', '', '', '', '', '', '']; // array will store X's and O's

        // Game Grid Cell Pattern - Numbering
        //
        //    [0][1][2]
        //    [3][4][5]
        //    [6][7][8]

        // Private Methods (assigned to var so they're private - NOTE: these must be assigned prior to use
        var _privateMethod = function () { console.log('NAMESPACE.Game.privateMethod() executed via publicMethod() call'); };

        var _initGame = function () {
            jQuery('#gameButton').hide();
            _gamePlayer = 'X';
            _gameWinner = '';
            _resetGameGrid();
            _setMessage("X's go first; click a cell to begin");
        };

        var _setMessage = function (messageString) { jQuery('#gameMessage').text(messageString); };

        var _resetGameGrid = function () {
            var gridCellSelector;
            for (var gameGridCell = 0 ; gameGridCell < 9 ; gameGridCell++) {
                gridCellSelector = '#gameGridCell_' + gameGridCell.toString();
                jQuery(gridCellSelector).text(''); // clear displayed value
                jQuery(gridCellSelector).removeClass('gameGridCell_MouseOver').addClass('gameGridCell_MouseOut'); // reset grid cell background color
                _gameGridCellValue[gameGridCell] = ''; // clear stored value
            }
        };

        var _mouseoverGameGridCell = function (event) {
            if (_gameWinner === ''){
                var gridCellSelector = '#gameGridCell_' + event.data.cellNumber.toString();
                console.log('mouseover - ' + gridCellSelector);
                jQuery(gridCellSelector).removeClass('gameGridCell_MouseOut').addClass('gameGridCell_MouseOver');
            }
        };

        var _mouseoutGameGridCell = function (event) {
            if (_gameWinner === '') {
                var gridCellSelector = '#gameGridCell_' + event.data.cellNumber.toString();
                console.log('mouseout - ' + gridCellSelector);
                jQuery(gridCellSelector).removeClass('gameGridCell_MouseOver').addClass('gameGridCell_MouseOut');
            }
        };

        var _clickGameGridCell = function (event) {
            if (_gameWinner === ''){
                var cell = Number(event.data.cellNumber);
                var gridCellSelector = '#gameGridCell_' + event.data.cellNumber.toString();
                console.log('click - ' + gridCellSelector);
                console.log('cell: ' + cell + ', _gameGridCellValue = ' + _gameGridCellValue[cell]);
                if (_gamePlayer === 'X') {
                    if (_gameGridCellValue[cell] === '') {
                        jQuery(gridCellSelector).text('X');
                        _gameGridCellValue[cell] = 'X';
                        _gamePlayer = 'O'
                        _setMessage("O's turn, pick an empty cell");
                    } else {
                        _setMessage("Already filled; choose another");
                    }
                } else {// _gamePlayer = 'O'
                    if (_gameGridCellValue[cell] === '') {
                        jQuery(gridCellSelector).text('O');
                        _gameGridCellValue[cell] = 'O';
                        _gamePlayer = 'X'
                        _setMessage("X's turn, pick an empty cell");
                    } else {
                        _setMessage("Already filled; choose another");
                    }
                }
                jQuery(gridCellSelector).removeClass('gameGridCell_MouseOver').addClass('gameGridCell_MouseOut');
                _scoreGame();
            }
        };

        var _scoreGame = function () {
            // Game Grid Cell Pattern - Numbering
            //
            //    [0][1][2]
            //    [3][4][5]
            //    [6][7][8]

            // check row winner
            if (_gameWinner === '') {
                if (_gameGridCellValue[0] !== '' && _gameGridCellValue[0] === _gameGridCellValue[1] && _gameGridCellValue[1] === _gameGridCellValue[2]) { _gameWinner = _gameGridCellValue[0]; } // row 1
                if (_gameGridCellValue[3] !== '' && _gameGridCellValue[3] === _gameGridCellValue[4] && _gameGridCellValue[4] === _gameGridCellValue[5]) { _gameWinner = _gameGridCellValue[3]; } // row 2
                if (_gameGridCellValue[6] !== '' && _gameGridCellValue[6] === _gameGridCellValue[7] && _gameGridCellValue[7] === _gameGridCellValue[8]) { _gameWinner = _gameGridCellValue[6]; } // row 3
                if (_gameWinner !== '') { console.log('row winner'); }
            }
            // check column winner
            if (_gameWinner === '') {
                if (_gameGridCellValue[0] !== '' && _gameGridCellValue[0] === _gameGridCellValue[3] && _gameGridCellValue[3] === _gameGridCellValue[6]) { _gameWinner = _gameGridCellValue[0]; } // column 1
                if (_gameGridCellValue[1] !== '' && _gameGridCellValue[1] === _gameGridCellValue[4] && _gameGridCellValue[4] === _gameGridCellValue[7]) { _gameWinner = _gameGridCellValue[1]; } // column 2
                if (_gameGridCellValue[2] !== '' && _gameGridCellValue[2] === _gameGridCellValue[5] && _gameGridCellValue[5] === _gameGridCellValue[8]) { _gameWinner = _gameGridCellValue[2]; } // column 3
                if (_gameWinner !== '') { console.log('column winner'); }
            }
            // check diagonal winner
            if (_gameWinner === '') {
                if (_gameGridCellValue[0] !== '' && _gameGridCellValue[0] === _gameGridCellValue[4] && _gameGridCellValue[4] === _gameGridCellValue[8]) { _gameWinner = _gameGridCellValue[0]; } // diagonal upper-left/lower-right
                if (_gameGridCellValue[6] !== '' && _gameGridCellValue[6] === _gameGridCellValue[4] && _gameGridCellValue[4] === _gameGridCellValue[2]) { _gameWinner = _gameGridCellValue[6]; } // diagonal lower-left/upper-right
                if (_gameWinner !== '') { console.log('diagonal winner'); }
            }
            // check for draw
            if (_gameWinner === '') {
                var emptyCell = false;
                var gameGridCell = 0;
                do {
                    if (_gameGridCellValue[gameGridCell] === '') { emptyCell = true; }
                    gameGridCell += 1;
                }
                while (emptyCell === false && gameGridCell < 9)
                if (emptyCell === false) { _gameWinner = 'DRAW'; console.log('draw'); }
            }
            // update results
            if (_gameWinner !== '') {
                switch (_gameWinner) {
                    case 'X':
                        _setMessage("X Wins!");
                        jQuery('#gameButton').show();
                        break;
                    case 'O':
                        _setMessage("O Wins!");
                        jQuery('#gameButton').show();
                        break;
                    case 'DRAW':
                        _setMessage("It's a Draw!");
                        jQuery('#gameButton').show();
                        break;
                    default:
                        jQuery('#gameButton').hide();
                        // still playing
                }
            }

        };

        var _bindEventHandlers = function () {
            // helpful explanation of parameter passing functionality:
            //      see: http://stackoverflow.com/questions/3273350/jquerys-click-pass-parameters-to-user-function
            //      see: http://stackoverflow.com/questions/3473639/best-way-to-convert-string-to-array-of-object-in-javascript
            
            var stringJSON, eventData;
            var gridCellSelector;
            for (var gameGridCell = 0 ; gameGridCell < 9 ; gameGridCell++) {
                stringJSON = '{"cellNumber":"' + gameGridCell + '"}';
                eventData = JSON.parse(stringJSON);
                gridCellSelector = '#gameGridCell_' + gameGridCell.toString();
                jQuery(gridCellSelector).mouseover(eventData, _mouseoverGameGridCell);
                jQuery(gridCellSelector).mouseout(eventData, _mouseoutGameGridCell);
                jQuery(gridCellSelector).click(eventData, _clickGameGridCell);
            }   
        }

        // Public Property Accessors
        Object.defineProperty(this, "publicAccessor",{
            get: function() { return _privateMember; }
        });

        // Public Methods	
        this.publicMethod = function() { console.log('NAMESPACE.Game.publicMethod() called'); _privateMethod(); };

        this.gameButtonClick = function () { _initGame(); };

        console.log('NAMESPACE.Game - initialized');

        // Game Intialization
        _bindEventHandlers(); // should only run once
        _initGame();

        return this; // NOTE: only public properties and methods are returned
    };

    //	Singleton Instantiator (public)
    this.getInstance = function() {
        if( !_instance ) { _instance = Game(); }
        return _instance;
    };

    return this; //  NOTE: only getInstance() method is returned

})();