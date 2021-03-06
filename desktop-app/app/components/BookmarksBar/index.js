// @flow
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import BookmarkEditDialog from './BookmarkEditDialog'
import styles from './style.css';

export const BookmarksBar = function ({bookmarks, onBookmarkClick, onBookmarkDelete, onBookmarkEdit}) {
  return <Grid container direction="row" justify="flex-start" alignItems="center" className={styles.bookmarks} spacing={1}>
    {bookmarks.map((bookmark, k) => (
      <BookmarkItem bookmark={bookmark} onClick={onBookmarkClick} key={'bookmark' + k} onDelete={onBookmarkDelete} onEdit={onBookmarkEdit}/>
    ))}
    </Grid>
};

const useToggle = function () {
  const [value, setValue] = useState(false)
  return [
    value,
    function () { setValue(true) },
    function () { setValue(false) }
  ]
}

function BookmarkItem ({bookmark, onClick, onDelete, onEdit}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [renameDialog, openRenameDialog, closeRenameDialog] = useToggle(null)

  const handleContextMenu = function (event) {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = function () {
    setAnchorEl(null);
  };

  const handleClick = function () {
    onClick(bookmark)
  };

  const handleDelete = function () {
    onDelete(bookmark)
  };

  const handleRename = function (title, url) {
    onEdit(bookmark, {title, url})
    setAnchorEl(null)
  }

  const closeDialog = function () {
    closeRenameDialog()
    setAnchorEl(null)
  }

  return <Grid item key={bookmark.url}>
    <Button aria-controls="bookmark-menu" aria-haspopup="true" onClick={handleClick} onContextMenu={handleContextMenu}>
      {bookmark.title}
    </Button>
    <Menu
      id="bookmark-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={openRenameDialog}>Rename</MenuItem>
      <MenuItem onClick={handleDelete}>Delete</MenuItem>
    </Menu>
    <BookmarkEditDialog open={renameDialog} onSubmit={handleRename} onClose={closeDialog} bookmark={bookmark}/>
  </Grid>
}
