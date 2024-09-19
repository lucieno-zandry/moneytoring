import React from "react";
import useSetting from "./useSetting";

export default function () {
    const { setting } = useSetting();

    const amountFormatter = React.useMemo(() => new Intl.NumberFormat(setting.language, {
        style: 'currency',
        currency: setting.currency,
    }), [setting.language, setting.currency]);

    const numberFormatter = React.useMemo(() => new Intl.NumberFormat(setting.language), [setting.language]);

    const toNumber = React.useCallback((formattedValue: string): number => {
        const parts = numberFormatter.formatToParts(12345.67);

        let decimalSeparator = '.';
        let groupSeparator = ',';

        for (const part of parts) {
            if (part.type === 'decimal') {
                decimalSeparator = part.value;
            } else if (part.type === 'group') {
                groupSeparator = part.value;
            }
        }

        let cleanedValue = formattedValue.replace(new RegExp(`[${groupSeparator}\\s]`, 'g'), '');
        cleanedValue = cleanedValue.replace(new RegExp(`\\${decimalSeparator}`), '.');
        cleanedValue = cleanedValue.replace(/[^0-9.-]/g, '');

        return parseFloat(cleanedValue);
    }, [numberFormatter]);

    return {
        toNumber,
        toAmount: amountFormatter.format,
        toString: numberFormatter.format,
    }
}