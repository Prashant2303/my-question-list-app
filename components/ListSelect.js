import styles from 'styles/ListSelect.module.css';
import { Paper, MenuItem, TextField, Grid, IconButton } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CreateList from './CreateList';
import EditList from './EditList';
import CustomModal from './CustomModal';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { statePrivateLists, stateSelectedList, stateUser } from "store/atoms";
import { useHooks } from 'service/apiCalls';
import { DeleteForever } from '@mui/icons-material';

export default function ListSelect({ loading }) {

    const hooks = useHooks();
    const user = useRecoilValue(stateUser);
    const privateLists = useRecoilValue(statePrivateLists);
    const [selectedList, setSelectedlist] = useRecoilState(stateSelectedList);
    const [showCreate, setShowCreate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [changing, setChanging] = useState(false);
    const listAccess = privateLists?.find(list => list._id === selectedList).access;

    const handleChange = (event) => {
        setSelectedlist(event.target.value);
    };

    const changeAccess = async () => {
        let value;
        if (listAccess === 'Private') {
            value = 'Public';
            closeModal();
        } else {
            value = 'Private';
        }
        setChanging(true);
        await hooks.updateList('access', value);
        setChanging(false);
    }

    const handleOpenEdit = () => {
        setShowEdit(!showEdit)
        if (showCreate) setShowCreate(false);
    }

    const handleOpenCreate = () => {
        setShowCreate(!showCreate)
        if (showEdit) setShowEdit(false);
    }

    const handleDelete = async () => {
        closeDeleteModal();
        setLoadingDelete(true);
        await hooks.deleteList();
        setLoadingDelete(false);
    }

    const [deleteModalState, setDeleteModalState] = useState(false);
    const openDeleteModal = () => setDeleteModalState(true);
    const closeDeleteModal = () => setDeleteModalState(false);

    const [modalState, setModalState] = useState(false);
    const openModal = () => setModalState(true);
    const closeModal = () => setModalState(false);

    const renderSelect = () => (
        <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={8}>
                <TextField
                    select
                    name="selectedList"
                    value={selectedList}
                    label="Selected List"
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    disabled={loading}
                >
                    {privateLists.map(list =>
                        <MenuItem key={list._id} value={list._id} >
                            {list.name} {list._id === user.defaultList ? '(Default)' : null} ({list.access})
                        </MenuItem>)}
                </TextField>
            </Grid>
            <Grid item xs={4.8} sm={2} textAlign="center">
                {listAccess === 'Private' ?
                    <CustomModal
                        open={modalState}
                        closeModal={closeModal}
                        passedFunction={changeAccess}
                        confirm
                        content={{
                            'header': 'Make this list public ?',
                            'body': 'All the questions, their difficulty and notes from this list will be available publicly. This action is reversible.'
                        }}
                    >
                        <LoadingButton
                            variant="text"
                            disableElevation
                            onClick={openModal}
                            size="medium"
                            loading={changing}
                        >
                            Set as Public
                        </LoadingButton>
                    </CustomModal> :
                    <LoadingButton
                        variant="text"
                        disableElevation
                        onClick={changeAccess}
                        size="medium"
                        loading={changing}
                    >
                        Set as Private
                    </LoadingButton>}
            </Grid>
            <Grid item xs={2.4} sm={0.6} textAlign="center">
                <IconButton color="primary" onClick={handleOpenEdit}>
                    <EditIcon />
                </IconButton>
            </Grid>
            <Grid item xs={2.4} sm={0.7} textAlign="center">
                <IconButton color="primary" onClick={handleOpenCreate}>
                    <AddIcon />
                </IconButton>
            </Grid>
            <Grid item xs={2.4} sm={0.7} textAlign="center">
                <CustomModal
                    open={deleteModalState}
                    closeModal={closeDeleteModal}
                    passedFunction={handleDelete}
                    content={{
                        'header': 'Delete this list ?',
                        'body': 'This action is not reversible.'
                    }}
                >
                    <IconButton disabled={loadingDelete} color='error' onClick={openDeleteModal}>
                        <DeleteForever />
                    </IconButton>
                </CustomModal>
            </Grid>
        </Grid>
    )

    return (
        <Paper className={styles.listSelect} elevation={3}>
            {!privateLists || privateLists?.length === 0
                ? null : renderSelect()}
            {showCreate ? <CreateList setShowCreate={setShowCreate} /> : null}
            {showEdit ? <EditList setShowEdit={setShowEdit} /> : null}
        </Paper>
    )
}