const localStorageKey = 'favorite-exercises'

export function addIdToLocalStorage(exerciseId) {
    try {
        const currentIds = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
        
        if (!currentIds.includes(exerciseId)) {
            currentIds.push(exerciseId);
            localStorage.setItem(localStorageKey, JSON.stringify(currentIds));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error adding ID to localStorage:', error);
        return false;
    }
}

export function removeIdFromLocalStorage(exerciseId){
    try {
        const currentIds = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
        const index = currentIds.indexOf(exerciseId);
        
        if (index !== -1) {
            currentIds.splice(index, 1);
            localStorage.setItem(localStorageKey, JSON.stringify(currentIds));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error removing ID from localStorage:', error);
        return false;
    }
}

export function isIdPresentInLocalStorage(exerciseId) {
    try {
        const currentIds = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
        return currentIds.includes(exerciseId);
    } catch (error) {
        console.error('Error checking ID in localStorage:', error);
        return false;
    }
}


export function getAllIdFromLocalStorage() {
    return JSON.parse(localStorage.getItem(localStorageKey) || '[]');
}