const showUpdateTagModal = (id, title) => {
    const updateTagModal = document.querySelector('#update-tag-modal');
    updateTagModal.classList.remove('invisible');

    const closeUpdateTagModal = document.querySelector('.close-update-tag-modal');
    closeUpdateTagModal.addEventListener('click', () => {
        updateTagModal.classList.add('invisible');
    });

    const tagId = document.querySelector('#tag-id');
    tagId.value = id;

    const tagTitle = document.querySelector('.tag-title');
    tagTitle.value = title;
}