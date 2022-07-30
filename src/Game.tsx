import { useState } from 'react'
import './Game.css'

type Tiles = typeof DEFAULT_TILES_VALUE
const DEFAULT_TILES_VALUE: (string | null)[] = Array(9).fill(null)
const PLAYER1 = 'player1'
const PLAYER2 = 'player2'
const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function getWinningCombo(tiles: typeof DEFAULT_TILES_VALUE) {
    return WINNING_COMBOS.find(
        ([a, b, c]) =>
            tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]
    )
}
function getNextPlayer(tiles: Tiles) {
    return tiles.filter(Boolean).length % 2 === 0 ? PLAYER1 : PLAYER2
}
function getTileSymbolSymbol(tile: Tiles[0]) {
    switch (tile) {
        case PLAYER1:
            return 'X'
        case PLAYER2:
            return 'O'
        default:
            return ''
    }
}

type TileProps = {
    tile: Tiles[0]
    className?: string
    disabled: boolean
    onClick: () => void
}

function Tile({ tile, disabled, className = '', onClick }: TileProps) {
    return (
        <button
            className={`tile ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {getTileSymbolSymbol(tile)}
        </button>
    )
}

export default function Game() {
    const [tiles, setTiles] = useState(DEFAULT_TILES_VALUE)
    const currentPlayerTurn = getNextPlayer(tiles)
    const winningCombo = getWinningCombo(tiles)
    const winner = winningCombo && tiles[winningCombo[0]]
    const resetBtn = (
        <button
            className="reset-btn"
            onClick={() => setTiles(DEFAULT_TILES_VALUE)}
        >
            reset
        </button>
    )
    function getHeaderContent() {
        if (winner)
            return (
                <>
                    Winner: {winner} {resetBtn}
                </>
            )
        if (tiles.every(Boolean)) return <>draw {resetBtn}</>
        return <>player turn: {currentPlayerTurn}</>
    }

    return (
        <div>
            <header>{getHeaderContent()}</header>
            <div className="game">
                {tiles.map((tile, index) => (
                    <Tile
                        key={index}
                        tile={tile}
                        disabled={Boolean(tile || winningCombo)}
                        className={
                            winningCombo &&
                            (winningCombo?.includes(index) ? 'winner' : 'loser')
                        }
                        onClick={() => {
                            const _tiles = [...tiles]
                            _tiles[index] = currentPlayerTurn
                            setTiles(_tiles)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
