type LoggerParams = {
    line?: number | string; // Hata satırı
    message: string; // Hata mesajı
    color: string; // Renk parametresi, log rengini belirtir
    timestamp?: boolean; // Log'a zaman damgası eklemek isteyip istemediğinizi belirten opsiyonel parametre
};

export const logger = ({ line, message, color, timestamp = true }: LoggerParams) => {
    // Zaman damgası ekleme isteği varsa, log mesajına tarih saat ekle
    const time = timestamp ? new Date().toISOString() : '';

    // Log formatı oluşturuluyor
    const formattedMessage = `
    ${time} ${color ? `[${color.toUpperCase()}]` : '[INFO]'} 
    ${line ? `Line ${line.toString()}: ` : ''}${message}
  `;

    // Log'u konsola yazdırıyoruz
    console.log(formattedMessage);
};


