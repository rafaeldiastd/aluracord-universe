import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_URL;
const supabaseKey = process.env.NEXT_PUBLIC_KEY;


export default function ChatPage() {

    const router = useRouter();
    const usuarioLogado = router.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagem, setListaMensagem] = React.useState([]);
    const varTeste = "testandosabagassa"

    const supabaseClient = createClient(supabaseUrl, supabaseKey );

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListaMensagem(data);
            })
    });


    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([mensagem])
            .then(({ data }) => {
                console.log('Criando mensagens ', data)
                setListaMensagem([ // Altera a useState listaMensagem
                    data[0], // Incorpora a mensagem nova
                    ...listaMensagem, // Distribui a mensagem que já tinha
                ]);
            });
        setMensagem('') // Esvazia a useState Mensagem
    }

    function handleDeleteMessage(antigoId) {
        supabaseClient
            .from('mensagens')
            .delete()
            .match({ id: Number(antigoId) })
            .then(({ data, error }) => {
                console.log(error);
            })
        setListaMensagem((old) => {
            return old.filter(item => item.id !== antigoId);
        });
    }

    return (


        <Box  // DIV DO BODY
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: appConfig.theme.images.bg,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >

       

            <Box // DIV QUE ENGLOBA O CHAT
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
                

                <Header // DIV DO CABEÇALHO - Sendo criada por uma function
                />


                <Box // DIV DO CHAT 
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
                    <MessageList // DIV DA LISTA DE MENSAGENS
                        mensagens={listaMensagem} setMensagens={setListaMensagem} onDelete={handleDeleteMessage} />

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
                                if (event.key === 'Enter') {
                                    if (mensagem.length < 1) {
                                        event.preventDefault();
                                    } else {
                                        event.preventDefault();
                                        handleNovaMensagem(mensagem);
                                    }
                                }
                            }}

                            placeholder={`Insira sua mensagem aqui...`}
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
    const router = useRouter();
    const nomeUser = router.query.name;
    const username = router.query.username;
    const linkPerfil = `https://github.com/${username}`
    return (
        <>
            <Box styleSheet={{ display: 'flex', justifyContent: 'end' }}>
                               <Button 
                    iconName="times"
                    colorVariant="dark"
                    variant="secondary"
                    href="/"
                    label="Sair"
                    size="xs"
                    styleSheet={{
                        marginBottom: '20px',
                        border: '0',
                        fontSize: '12px',
                        borderRadius: '10px',
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                        color: appConfig.theme.colors.neutrals[200],hover: {
                            backgroundColor: appConfig.theme.colors.neutrals["500"],
                            color: appConfig.theme.colors.neutrals[200],
                        }
                    }}
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    const router = useRouter();
    const usuarioLogado = router.query.username;
    const handleData = (data) => {
        const novaData = new Date(data);
        const dataAtual = new Date();
        const dia = (dataAtual.toLocaleDateString() === novaData.toLocaleDateString()) ? 'Hoje' : novaData.toLocaleDateString();
        return (`${dia} - ${novaData.toLocaleTimeString()}`)
    }
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

                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>

                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                    display: 'inline-flex',
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
                                    src={`https://github.com/${mensagem.de}.png`}

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
                            </Box>

                            <Box
                                styleSheet={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >

                                <Text
                                    tag="span"
                                    styleSheet={{
                                        fontSize: '9px',
                                        marginLeft: '10px',

                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                >
                                    {handleData(mensagem.created_at)}

                                </Text>


                                <Button


                                    onClick={() => {
                                        if (usuarioLogado === mensagem.de) {
                                            props.onDelete(mensagem.id)
                                        } else {
                                            alert("Você não pode deletar, essa mensagem não é sua.")
                                        }

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
                                        height: '50px',
                                        fontSize: '9px',
                                        borderRadius: '10px',
                                        backgroundColor: appConfig.theme.colors.neutrals[800],
                                        color: appConfig.theme.colors.neutrals[200],
                                    }}
                                />
                            </Box>
                        </Box>


                    </Text>
                );
            })}

        </Box>
    )
}