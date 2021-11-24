import React from 'react';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AccountView = () => {

    const navigation = [
        { name: 'Commandes', href: '#' },
        { name: 'Données du compte', href: '#' },
        { name: 'Panier', href: '#' },
        { name: 'Favoris', href: '#' },
        { name: 'Moyens de paiement', href: '#' },
        { name: 'Gestion du mot de passe', href: '#' },
        { name: 'Déconnexion', href: '#' },
    ]

    return (

        <div className="flex flex-col justify-center items-center m-10">
            <div className="box-border h-70 w-90 p-4 border-4">

                <div className="grid grid-cols-2 gap-4 place-content-center">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-black' : 'text-black hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default AccountView;