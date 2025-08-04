const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'bot1' // Identificador da sessão (pode mudar se usar várias contas)
    }),
    puppeteer: {
        headless: true, // se quiser ver o navegador abrindo, coloque false
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Mostra QR Code no terminal
client.on('qr', (qr) => {
    console.log('🔐 Escaneie o QR Code para autenticar:');
    qrcode.generate(qr, { small: true });
});

// Conectado com sucesso
client.on('ready', () => {
    console.log('✅ WhatsApp conectado com sucesso!');
});

// Falha na autenticação
client.on('auth_failure', msg => {
    console.error('❌ Erro de autenticação:', msg);
});

// Desconectado
client.on('disconnected', reason => {
    console.log('⚠️ Cliente desconectado:', reason);
});

// Ação ao receber mensagem
client.on('message', async msg => {
    const texto = msg.body.toLowerCase();

    if (texto.includes('oi') || texto.includes('menu') || texto.includes('olá')) {
        await msg.reply(
            'Olá! Sou o assistente virtual.\n\nDigite uma opção:\n1 - Informações\n2 - Preços\n3 - Falar com humano'
        );
    } else if (texto === '1') {
        await msg.reply('📌 Nossa empresa oferece atendimento 24h via WhatsApp!');
    } else if (texto === '2') {
        await msg.reply('💰 Planos a partir de R$22,50 por mês.');
    } else if (texto === '3') {
        await msg.reply('👨‍💼 Um atendente irá falar com você em breve.');
    }
});

client.initialize();
