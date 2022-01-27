import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagem, setListaMensagem] = React.useState([])

    /* Sua lógica vai aqui

    // Usuário
    - Usuario digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem

    // Dev
    - Criar o campo textarea
    - Vamos usar o onChange - setState para trocar Valor da Mensagem (ter  if para caso o enter para limpar a variavel)
    - Lista de mensagens

    */

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listaMensagem.length + 1,
            de: 'rafaeldiastd',
            texto: novaMensagem,
        };

        setListaMensagem([ // Altera a useState listaMensagem
            mensagem, // Incorpora a mensagem nova
            ...listaMensagem, // Distribui a mensagem que já tinha
        ]);

        setMensagem('') // Esvazia a useState Mensagem
    }


    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: appConfig.theme.images.bg,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '10px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '80%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />

                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '10px',
                        padding: '16px',
                    }}
                >

                    <MessageList 
                    mensagens={listaMensagem} setMensagens={setListaMensagem} 

                    onDelete={(id) => {
                        setListaMensagem(listaMensagem.filter((element) => {
                            return element.id !== id
                        }))
                    }}/>

                    {/* {listaMensagem.map((mensagemAtual) => {
                        return (
                            <li key = {mensagemAtual.id}>                                
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'stretch',
                        }}
                    >
                        <TextField

                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}

                            onKeyPress={(event) => {
                                if (event.key === 'Enter') { // Se eu apertar enter
                                    if (mensagem.length < 1) {
                                        event.preventDefault(); // Ele retira o comportamento padrao (pular linha)
                                    } else {
                                        event.preventDefault(); // Ele retira o comportamento padrao (pular linha)
                                        handleNovaMensagem(mensagem);
                                    }
                                }

                            }}

                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '90%',
                                border: '0',
                                borderRadius: '10px',
                                padding: '20px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <Button

                            onClick={(event) => {
                                if (mensagem.length < 1) {
                                    event.preventDefault(); // Ele retira o comportamento padrao (pular linha)
                                } else {
                                    event.preventDefault(); // Ele retira o comportamento padrao (pular linha)
                                    handleNovaMensagem(mensagem);
                                    document.querySelector('textarea').focus()
                                }
                            }}

                            type='submit'
                            label='Enviar'
                            buttonColors={{
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                color: appConfig.theme.colors.neutrals[200],
                            }}

                            styleSheet={{
                                width: '10%',
                                maxHeight: '90%',
                                marginLeft: '20px',
                                border: '0',
                                borderRadius: '10px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {

                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            borderTop: `1px solid ${appConfig.theme.colors.neutrals[700]}`,
                            padding: '20px',
                            fontSize: '14px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex',
                                alignContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '20px',
                                    marginRight: '20px',
                                    display: 'inline-flex',

                                }}
                                src='https://avatars.githubusercontent.com/u/11541490?v=4'

                            />
                            <Text

                                tag="strong"
                                styleSheet={{
                                    color: appConfig.theme.colors.primary[300],
                                }}>
                                {mensagem.de}

                                <Box
                                    styleSheet={{
                                        color: appConfig.theme.colors.neutrals[100],
                                        fontSize: '14px',
                                        marginTop: '5px',
                                    }}
                                >
                                    {mensagem.texto}
                                </Box>

                            </Text>

                            <Text
                                tag="span"
                                styleSheet={{
                                    fontSize: '9px',
                                    marginLeft: '10px',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-end',

                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Text
                                tag="span"
                                styleSheet={{
                                    fontSize: '9px',
                                    marginLeft: '10px',

                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                            >
                                <Button

                                    onClick={() => {
                                        props.onDelete(mensagem.id)

                                    }}
                                    
                                    type='submit'
                                    label='Excluir'
                                    buttonColors={{
                                        backgroundColor: appConfig.theme.colors.neutrals[800],
                                        color: appConfig.theme.colors.neutrals[200],
                                    }}

                                    styleSheet={{
                                        marginLeft: '20px',
                                        border: '0',
                                        fontSize: '9px',
                                        borderRadius: '10px',
                                        backgroundColor: appConfig.theme.colors.neutrals[800],
                                        color: appConfig.theme.colors.neutrals[200],
                                    }}
                                />
                            </Text>
                        </Box>


                    </Text>
                );
            })}

        </Box>
    )
}