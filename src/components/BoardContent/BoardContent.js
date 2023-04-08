import React, { useState, useEffect} from "react";
import {isEmpty} from 'lodash'
import {Container, Draggable} from 'react-smooth-dnd'
import { flushSync } from 'react-dom';
import './BoardContent.scss'

import Column from "components/Column/Column";
import {mapOrder} from "utilities/sorts"
import {applyDrag} from "utilities/dragDrop"

import { initialData } from "actions/initialData";

function BoardContent() {
const [board, setBoard] = useState({})
const [columns, setColumn] = useState([])

useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
        setBoard(boardFromDB)

        setColumn(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
}, [])

if (isEmpty(board)) {
    return <div className="not-found">Board not found!</div>
}
const onColumnDrop = (dropResult) => {
  // copy columns to newColumns without change columns value
  let newColumns = [...columns]
  newColumns = applyDrag(newColumns, dropResult)

  let newBoard = {...board}
  newBoard.columnOrder = newColumns.map(c => c.id)
  newBoard.columns = newColumns
  console.log(newBoard)

  setColumn(newColumns)
  setBoard(newBoard)
}

const onCardDrop = (columnId, dropResult) => {
  if (dropResult.addedIndex !==null || dropResult.removedIndex !== null) {
    let newColumns = [...columns];

    let currentColumn = newColumns.find(c => c.id === columnId)

    currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
    currentColumn.cardOrder = currentColumn.cards.map(i => i.id)
    setColumn(newColumns)
  }
}

    return (
        <div className='board-content'>
          <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          getChildPayload={index => columns[index]
          }
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'column-drop-preview'
          }}
          >
            {columns.map((column, index) =>
            (
            <Draggable key={index}>
              <Column column={column} onCardDrop={onCardDrop}/>
            </Draggable>
            ))}
          </Container>
        
      </div>
    )
}

export default BoardContent