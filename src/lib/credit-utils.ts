export const getInterestRate = (months: number) => {
    if (months <= 12) return 3.5;
    if (months <= 24) return 4.1;
    if (months <= 36) return 4.8;
    if (months <= 48) return 5.5;
    if (months <= 60) return 6.8;
    return 7.5;
};

export const calculateCredit = (carPrice: number, dpPercentage: number, tenorMonths: number) => {
    const interestRate = getInterestRate(tenorMonths);
    const dpAmount = (carPrice * dpPercentage) / 100;
    const loanAmount = carPrice - dpAmount;
    const totalInterest = (loanAmount * (interestRate / 100) * (tenorMonths / 12));
    const totalLoan = loanAmount + totalInterest;

    return {
        interestRate,
        dpAmount,
        loanAmount,
        monthlyInstallment: totalLoan / tenorMonths,
        totalDP: dpAmount + (carPrice * 0.025) + 2500000 // Inc. Insurance & Admin
    };
};

export const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(val);
};
