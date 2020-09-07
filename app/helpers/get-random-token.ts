const generateRandomToken = function() {
    const rand  = function() {
        return Math.random().toString(36).substr(2);
    };
    
    return rand() + rand(); // to make it longer
};

export default generateRandomToken