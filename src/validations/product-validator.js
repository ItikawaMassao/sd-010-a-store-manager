function nameIsValid(name) {
    if ((name || '').length > 4) return { isValid: true };

    return {
        isValid: false,
        message: '"name" length must be at least 5 characters long',
    };
}

function quantityIsValid(quantity) {
    const isNumber = typeof quantity === 'number';
    if (!isNumber) {
        return {
            isValid: false,
            message: '"quantity" must be a number',
        };
    }

    if (quantity < 1) {
        return {
            isValid: false,
            message: '"quantity" must be larger than or equal to 1',
        };
    }

    return { isValid: quantityIsValid };
}

function isValid(productName, productQuantity) {
    const nameValidationResult = nameIsValid(productName);
    if (!nameValidationResult.isValid) {
        return nameValidationResult;
    }

    const quantityValidationResult = quantityIsValid(productQuantity);
    if (!quantityValidationResult.isValid) {
        return quantityValidationResult;
    }

    return {
        isValid: true,
    };
}

module.exports = {
    isValid,
};