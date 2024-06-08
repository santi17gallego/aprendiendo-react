export const Square = ( { index, children, updateBoard, isSelected } ) => {

    const classname = isSelected ? 'square is-selected' : 'square'
  
    const handleClick = () => {
      updateBoard(index)
    }
  
    return (
      <div className={classname} onClick={handleClick}>
        {children}
      </div>
    )
  }