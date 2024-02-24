
async function recieveLocales(){
    var language = {
        'ENG': {
            'register': {
               'e1': 'Failed to register, account already exists',
               'e2': 'Failed to register account, try again later'
            },
            'login': {
                'e1': 'Login execption, account is deactivated',
                'e2': 'Incorrect username or password!',
                'e3': 'Login exception, Please try again'
            },
            'logout': {
                'e1': 'Login exception, continuing anyway'
            },
            'startSession': {
                'e1': 'Failed to start session, try again later'
            },
            'endSession': {
                'e1': 'Session exception, continuing anyway'
            },
            'verifyRegister': {
                'success': {
                    's1': 'Successfully verified'
                },
                'e1': 'Failed, incorrect code', 
                'e2': 'Failed to confirm account, try again later',
            },
            'checkAPI': {
                'success': {
                    's1': 'API Keys Found'
                },
                'e1': 'Failed to find keys, try again later'
            },
            'userinfo': {
                'e1': 'Failed to list username, try again later'
            },
            'explorer': {
                'likebots': {
                    'success': {
                        's1': 'Successfully gave rate to bot'
                    },
                    'e1': 'Failed to push bot ratings, try again later',
                    'e2': 'Failed to create like, try again later',
                    'e3': 'Failed to list widgets, subscribtion error'
                },
                'likeplanners': {
                    'success': {
                        's1': 'Successfully gave rate to bot'
                    },
                    'e1': 'Failed to push bot ratings, try again later',
                    'e2': 'Failed to create like, try again later',
                    'e3': 'Failed to list widgets, subscribtion error'
                },
                'tradingbots': {
                    'list': {
                        'e1': 'Failed to recieve publiced bots, try again later',
                        'e2': 'Failed to list widgets, subscribtion error'
                    },
                    'attach': {
                        'e1': 'Failed to attach bot, try again later',
                        'e2': 'Failed to list widgets, subscribtion error'
                    },
                    'calculateprofit': {
                        'e1': 'Failed to public calculate profits, try again later',
                        'e2': 'Failed to list widgets, subscribtion error'
                    },
                    'calculateprofit2': {
                        'e1': 'Failed to public calculate profits, try again later',
                        'e2': 'Failed to list widgets, subscribtion error'
                    },
                    'calculateprofit2futures': {
                        'e1': 'Failed to public calculate profits, try again later',
                        'e2': 'Failed to list widgets, subscribtion error'
                    },
                    'trades': {
                        'e1': 'Failed to update status, subscribtion error',
                        'e2': 'Failed to recieve public trades, try again later'
                    }
                },
                'planners': {
                    'list': {
                        'e1': 'Failed to recieve publiced planners, try again later',
                        'e2': 'Failed to list widgets, subscribtion error'
                    },
                    'attach': {
                        'e1': 'Failed to attach planner, try again later',
                        'e2': 'Failed to list widgets, subscribtion error'
                    }
                }
            },
            'watchlist': {
                'favorites': {
                    'create': {
                        'e1': 'Failed to update status, subscribtion error',
                        'e2': 'Failed to create watchlist, try again later',
                        'e3': 'Failed to list widgets, subscribtion error'
                    },
                    'delete': {
                        'e1': 'Failed to update status, subscribtion error',
                        'e2': 'Failed to delete watchlist, try again later',
                        'e3': 'Failed to list widgets, subscribtion error'
                    }
                }
            },
            'dashboard': {
                'spot': {
                    'marketorder': {
                        'e1': 'Failed to create order, try again later',
                        'e2': 'Failed to create order, account is restricted',
                        'e3': 'Failed to list widgets, subscribtion error'
                    },
                    'limitorder': {
                        'e1': 'Failed to create order, try again later',
                        'e2': 'Failed to create order, account is restricted',
                        'e3': 'Failed to list widgets, subscribtion error'
                    },
                    'cancelorder': {
                        'e1':  'Failed to cancel order, try again later',
                        'e2': 'Failed to create order, account is restricted',
                        'e3': 'Failed to list widgets, subscribtion error'
                    },
                    'openorders': {
                        'e1': 'Failed to recieve open orders, try again later',
                        'e2': 'Failed to recieve open orders, account is restricted',
                        'e3': 'Failed to list widgets, subscribtion error'
                    }
                },
                'fututes': {
                    'marketorder': {
                        'e1': 'Failed to create order, try again later',
                        'e2': 'Failed to cancel order, account is restricted',
                        'e3': 'Failed to list widgets, subscribtion error'
                    },
                    'limitorder': {
                        'e1': 'Failed to create order, try again later',
                        'e2': 'Failed to cancel order, account is restricted',
                        'e3': 'Failed to list widgets, subscribtion error'
                    },
                    'cancelorder': {
                        'e1': 'Failed to cancel order, try again later',
                        'e2': 'Failed to cancel order, account is restricted',
                        'e3': 'Failed to list widgets, subscribtion error'
                    },
                    'openorders': {
                        'e1': 'Failed to recieve open orders, try again later',
                        'e2': 'Failed to recieve open orders, account is restricted',
                        'e3': 'Failed to list widgets, subscribtion error'
                    },
                    'positions': {
                        'info': {
                            'e1': 'Failed to recieve position, try again later',
                            'e2': 'Failed to recieve position, account is restricted',
                            'e3': 'Failed to list widgets, subscribtion error'
                        },
                        'changeasset': {
                            'e1': 'Failed to recieve position, try again later',
                            'e2': 'Failed to recieve position, account is restricted',
                            'e3': 'Failed to list widgets, subscribtion error'
                        },
                        'getasset': {
                            'e1': 'Failed to recieve position, try again later',
                            'e2': 'Failed to recieve position, account is restricted',
                            'e3': 'Failed to list widgets, subscribtion error'
                        },
                        'closeposition': {
                            'e1': 'Failed to create order, try again later',
                            'e2': 'Failed to recieve position, account is restricted',
                            'e3': 'Failed to list widgets, subscribtion error'
                        },
                        'changeleverage': {
                            'e1': 'Failed to create order, try again later',
                            'e2': 'Failed to recieve position, account is restricted',
                            'e3': 'Failed to list widgets, subscribtion error'
                        }
                    }
                },
                'margin': {
                    'marketorder': {
                        'e1': 'Failed to create order, try again later',
                        'e2': 'Failed to cancel order, account is restricted',
                        'e3': 'Failed to list widgets, subscribtion error'
                    },
                    'limitorder': {
                        'e1': 'Failed to create order, try again later',
                        'e2': 'Failed to cancel order, account is restricted',
                        'e3': 'Failed to list widgets, subscribtion error'
                    },
                    'cancelorder': {
                        'e1': 'Failed to cancel order, try again later',
                        'e2': 'Failed to cancel order, account is restricted',
                        'e3': 'Failed to list widgets, subscribtion error'
                    },
                    'openorders': {
                        'e1': 'Failed to recieve open orders, try again later',
                        'e2': 'Failed to recieve open orders, account is restricted',
                        'e3': 'Failed to list widgets, subscribtion error'
                    },
                    'borrow': {
                        'e1': 'Failed to borrow asset, try again later',
                        'e2': 'Failed to borrow asset, account is restricted',
                        'e3': 'Failed to borrow asset, subscribtion error'
                    },
                    'repay': {
                        'e1': 'Failed to repay asset, try again later',
                        'e2': 'Failed to repay asset, account is restricted',
                        'e3': 'Failed to repay asset, subscribtion error'
                    },

                    'positions': {
                        'info': {
                            'e1': 'Failed to recieve position, try again later',
                            'e2': 'Failed to recieve position, account is restricted',
                            'e3': 'Failed to list widgets, subscribtion error'
                        },
                        'changeasset': {
                            'e1': 'Failed to recieve position, try again later',
                            'e2': 'Failed to recieve position, account is restricted',
                            'e3': 'Failed to list widgets, subscribtion error'
                        },
                        'getasset': {
                            'e1': 'Failed to recieve position, try again later',
                            'e2': 'Failed to recieve position, account is restricted',
                            'e3': 'Failed to list widgets, subscribtion error'
                        },
                        'closeposition': {
                            'e1': 'Failed to create order, try again later',
                            'e2': 'Failed to recieve position, account is restricted',
                            'e3': 'Failed to list widgets, subscribtion error'
                        },
                        'changeleverage': {
                            'e1': 'Failed to create order, try again later',
                            'e2': 'Failed to recieve position, account is restricted',
                            'e3': 'Failed to list widgets, subscribtion error'
                        }
                    }
                },
                
            },
            'widgets': {
                'balance': {
                    'e1': 'Failed to list widgets, try again later',
                    'e2': 'Failed to list widgets, subscribtion error'
                },
                'turnover': {
                    'e1': 'Failed to list widgets, try again later',
                    'e2': 'Failed to list widgets, subscribtion error'
                },
                'trades': {
                    'e1': 'Failed to list widgets, try again later',
                    'e2': 'Failed to list widgets, subscribtion error'
                },
                'completedtrades': {
                    'e1': 'Failed to list widgets, try again later',
                    'e2': 'Failed to list widgets, subscribtion error'
                },
                'activesignals': {
                    'e1': 'Failed to list widgets, try again later',
                    'e2': 'Failed to list widgets, subscribtion error'
                },
                'totalsignals': {
                    'e1': 'Failed to list widgets, try again later',
                    'e2': 'Failed to list widgets, subscribtion error'
                },
                'tradechart': {
                    'e1': 'Failed to list charts, try again later',
                    'e2': 'Failed to list widgets, subscribtion error'
                },
                'activebots': {
                    'e1': 'Failed to list widgets, try again later',
                    'e2': 'Failed to list widgets, subscribtion error'
                },
                'totalbots': {
                    'e1': 'Failed to list widgets, try again later',
                    'e2': 'Failed to list widgets, subscribtion error'
                }
            },
            'planner': {
                'create': {
                    'e1': 'Failed to update status, subscribtion error',
                    'e2': 'Failed to create planner, try again later',
                    'e3': 'Failed to create planner, account is restricted'
                },
                'list': {
                    'e1': 'Failed to update status, subscribtion error',
                    'e2': 'Failed to list planner trades, try again later'
                },
                'widget': {
                    'e1': 'Failed to recieve widgets, subscribtion error',
                    'e2': 'Failed to recieve widgets, server error'
                },
                'updateStatus': {
                    'e1': 'Failed to update status, subscribtion error',
                    'e2': 'Failed to delete plan, try again later'
                },
                'changeStatus': {
                    'e1': 'Failed to update status, try again later',
                    'e2': 'Failed to update status, subscribtion error'
                },
                'calculateprofit': {
                    'e1': 'Failed to calculate profits, try again later',
                    'e2': 'Failed to calculate profits, subscribtion error'
                },
                'calculateprofitfutures': {
                    'e1': 'Failed to calculate profits, try again later',
                    'e2': 'Failed to calculate profits, subscribtion error'
                },
                'calculateprofitmargin': {
                    'e1': 'Failed to calculate profits, try again later',
                    'e2': 'Failed to calculate profits, subscribtion error'
                },
                'publishplan': {
                    'e1': 'Failed to publish plan, try again later',
                    'e2': 'Failed to publish plan, subscribtion error'

                },
                'unpublishplan': {
                    'e1': 'Failed to unpublish plan, try again later',
                    'e2': 'Failed to unpublish plan, subscribtion error'
                },
                'trades': {
                    'e1': 'Failed to list planner trades, try again later',
                    'e2': 'Failed to list planner trades, subscribtion error'
                }

            },
            'cryptodetails': {
                'spot': {
                    'overview': {
                        'e1': 'Failed to list market info, try again later',
                        'e2': 'Failed to list market info, subscribtion error'
                    },
                    'technical': {
                        'e1': 'Failed to list market info, try again later',
                        'e2': 'Failed to list market info, subscribtion error'
                    }
                },
                'futures': {
                    'overview': {
                        'e1': 'Failed to list market info, try again later',
                        'e2': 'Failed to list market info, subscribtion error'
                    },
                    'technical': {
                        'e1': 'Failed to list market info, try again later',
                        'e2': 'Failed to list market info, subscribtion error'
                    }
                }
            },
            'cryptonews': {
                'list': {
                    'e1': 'Failed to list news, try again later',
                },
                'like': {
                    'e1': 'Failed to create news, try again later',

                }
            },
            'signals': {
                'spot': {
                    'list': {
                        'e1': 'Failed to list TradingView signals, try again later',
                        'e2': 'Failed to list TradingView signals, subscribtion error'
                    },
                    'search': {
                        'e1': 'Failed to search TradingView signals, try again later',
                        'e2': 'Failed to search TradingView signals, subscribtion error'
                    }
                },
                'futures': {
                    'list': {
                        'e1': 'Failed to list TradingView signals, try again later',
                        'e2': 'Failed to list TradingView signals, subscribtion error'
                    },
                    'search': {
                        'e1': 'Failed to search TradingView signals, try again later',
                        'e2': 'Failed to search TradingView signals, subscribtion error'
                    }
                },
                'margin': {
                    'list': {
                        'e1': 'Failed to list TradingView signals, try again later',
                        'e2': 'Failed to list TradingView signals, subscribtion error'
                    },
                    'search': {
                        'e1': 'Failed to search TradingView signals, try again later',
                        'e2': 'Failed to search TradingView signals, subscribtion error'
                    }
                }
            },
            'balances': {
                'spot': {
                    'e1': 'Failed to list balances, try again later',
                    'e2': 'Failed to list balances, subscribtion error'
                },
                'futures': {
                    'e1': 'Failed to list balances, try again later',
                    'e2': 'Failed to list balances, subscribtion error'
                },
                'futures2': {
                    'e1': 'Failed to list balances, try again later',
                    'e2': 'Failed to list balances, subscribtion error'
                },
                'margin': {
                    'e1': 'Failed to list balances, try again later',
                    'e2': 'Failed to list balances, subscribtion error'
                }
            },
            'tradehistory': {
                'spot': {
                    'history': {
                        'e1': 'Failed to list trade history, try again later',
                        'e2': 'Failed to list trade history, subscribtion error'
                    },
                    'normal': {
                        'e1': 'Failed to list trade history, try again later',
                        'e2': 'Failed to list trade history, subscribtion error'
                    }
                },
                'futures': {
                    'history': {
                        'e1': 'Failed to list trade history, try again later',
                        'e2': 'Failed to list trade history, subscribtion error'
                    },
                    'normal': {
                        'e1': 'Failed to list trade history, try again later',
                        'e2': 'Failed to list trade history, subscribtion error'
                    }
                },
                'margin': {
                    'history': {
                        'e1': 'Failed to list trade history, try again later',
                        'e2': 'Failed to list trade history, subscribtion error'
                    },
                    'normal': {
                        'e1': 'Failed to list trade history, try again later',
                        'e2': 'Failed to list trade history, subscribtion error'
                    }
                }
            },
     
            'tradingviewbots': {
                'spot': {
                    'tickers': {
                        'e1': 'Failed to recieve tickers, try again later',
                        'e2': 'Failed to recieve tickers, account is restricted',
                        'e3': 'Failed to list trade history, subscribtion error'
                    },
                    'create': {
                        'e1': 'Failed to add bot, try again later',
                        'e2': 'Failed to add bot, account is restricted',
                        'e3': 'Failed to add bot, subscribtion error'
                    },
                    'tradingFees': {
                        'e1': 'Failed to recieve trading fees, try again later',
                        'e2': 'Failed to recieve trading fees, account is restricted',
                        'e3': 'Failed to recieve trading fees, subscribtion error'
                    },
                    'trades': {
                        'e1': 'Failed to recieve trades, try again later',
                        'e2': 'Failed recieve trades, subscribtion error'
                    },
                    'newalert': {
                        'e1': 'Failed to list trade history, try again later',
                        'e2': 'Failed recieve trades, subscribtion error',
                        'e3': 'Failed to recieve trading fees, account is restricted',
                    },
                },
                'futures': {
                    'tickers': {
                        'e1': 'Failed to recieve tickers, try again later',
                        'e2': 'Failed to recieve tickers, account is restricted',
                        'e3': 'Failed to list trade history, subscribtion error'
                    },
                    'create': {
                        'e1': 'Failed to add bot, try again later',
                        'e2': 'Failed to recieve tickers, account is restricted',
                        'e3': 'Failed to list trade history, subscribtion error'
                    },
                    'tradingFees': {
                        'e1': 'Failed to recieve trading fees, try again later',
                        'e2': 'Failed to recieve trading fees, account is restricted',
                        'e3': 'Failed to recieve trading fees, subscribtion error'
                    },
                    'trades': {
                        'e1': 'Failed to recieve trades, try again later',
                        'e2': 'Failed recieve trades, subscribtion error'
                    },
                    'newalert2': {
                        'e1': 'Failed to list trade history, try again later',
                        'e2': 'Failed recieve trades, subscribtion error',
                        'e3': 'Failed to recieve trading fees, account is restricted',
                    }
                },
                'update': {
                    'e1': 'Failed to add bot, try again later',
                    'e2': 'Failed to add bot, account is restricted',
                    'e3': 'Failed to add bot, subscribtion error'
                },
                'list': {
                    'e1': 'Failed to recieve trades, try again later',
                    'e2': 'Failed recieve trades, subscribtion error'
                },
                'activebots': {
                    'e1': 'Failed to recieve active bots, try again later',
                    'e2': 'Failed to add bot, subscribtion error'
                },
                'totalbots': {
                    'e1': 'Failed to recieve bot widgets, try again later',
                    'e2': 'Failed to recieve bot widgets, subscribtion error'
                },
                'availablebalance': {
                    'e1': 'Failed to recieve available balances, try again later',
                    'e2': 'Failed to recieve available balances, subscribtion error'
                },
                'changestatus': {
                    'e1': 'Failed to recieve bot widgets, try again later',
                    'e2': 'Failed to recieve bot widgets, subscribtion error' 
                },
                'updateStatus': {
                    'e1': 'Failed to recieve bot widgets, try again later',
                    'e2': 'Failed to recieve bot widgets, subscribtion error'
                },
                'publish': {
                    'e1': 'Failed to publish bot, try again later',
                    'e2': 'Failed to publish bot, subscribtion error'
                },
                'unpublish': {
                    'e1': 'Failed to unpublish bot, try again later',
                    'e2': 'Failed to publish bot, subscribtion error'
                },
                
            },
            'apisettings': {
                'list': {
                    'e1': 'Failed to list keys, try again later',
                    'e2': 'Failed to list keys, subscribtion error'
                },
                'update': {
                    'e1': 'Failed to update keys, try again later',
                    'e2': 'Failed to update keys, subscribtion error'
                },
                'add': {
                    'e1': 'Failed to add keys, try again later',
                    'e2': 'Failed to add keys, subscribtion error'
                }
            },
           

            'wallet': {
                'deposit': {
                    'e1': 'Failed to deposit, try again later'
                }, 
                'widthdraw': {
                    'e1': 'Failed to withdraw, try again later'
                },
                'transfer': {
                    'e1': 'Failed to create transfer, try again later'
                },
                'traffic': {
                    'e1': 'Failed to list traffic, try again later'
                },
                'verify': {
                    'e1': 'Failed to verify, try again later',
                    's1': 'Spot & Margin Access'
                },
                'dust': {
                    'e1': 'Failed to dust, try again later'
                },
                'convert': {
                    'e1': 'Failed to covert, try again later'
                }
            },
            'system': {
                'status': {
                    'e1': 'Failed to recieve status, try again later'     
                },
                'tradingstatus': {
                    'e1': 'Failed to get trading status, try again later'
                },
                'restrictions': {
                    'e1': 'Failed to recieve restrictions, try again later'        
                }
            },
           

            'usersettings': {
                'tradinginfo': {
                    'e1': 'Failed to recieve data, try again later',
                },
                'info': {
                    'e1': 'Failed to recieve general information, try again later',
                    'e2': 'Failed to add keys, subscribtion error'
                },
                'info2': {
                    'e1': 'Failed to recieve general information, try again later',
                    'e2': 'Failed to add keys, subscribtion error'
                },
                'info3': {
                    'e1': 'Failed to recieve general information, try again later',
                    'e2': 'Failed to add keys, subscribtion error'
                },
                'lastinfo': {
                    'e1': 'Failed to recieve general information, try again later',
                    'e2': 'Failed to add keys, subscribtion error'
                },
                'paymentsadd': {
                    'e1': 'Failed to add, try again later'
                },
                'paymentslist': {
                    'e1': 'Failed to recieve information, try again later'
                },
                'newkeys': {
                    'e1': 'Failed to recieve newkeys, try again later',
                    'e2': 'Failed to recieve newkeys, subscribtion error'
                },
                'permissions': {
                    'update': {
                        'e1': 'Failed to update permissions, try again later'
                    },
                    'create': {
                        'e1': 'Failed to create permissions, try again later'
                    },
                    'check': {
                        'e1': 'Failed to check permissions, try again later'
                    }
                },
                'authy': {
                    'register': {
                        'e1': 'Failed to register 2FA authorization, try again later'
                    },
                    'update': {
                        'e1': 'Failed to update 2FA authorization, try again later'
                    },
                    'remove': {
                        'e1': 'Failed to remove 2FA authorization, try again later'
                    },
                    'settings': {
                        'e1': 'Failed to recieve 2FA settings, try again later'
                    },
                    'device': {
                        'update': {
                            'e1': 'Failed to update 2FA methods, try again later'
                        },
                        'delete': {
                            'e1': 'Failed to delete 2FA methods, try again later'
                        },
                        'create': {
                            'e1': 'Failed to create 2FA methods, try again later'
                        },
                        'confirm': {
                            'e1': 'Failed to confirm 2FA methods, try again later'
                        }
                    },
                    'token': {
                        'update': {
                            'e1': 'Failed to update 2FA methods, try again later'
                        },
                        'delete': {
                            'e1': 'Failed to delete 2FA methods, try again later'
                        },
                        'create': {
                            'e1': 'Failed to create 2FA methods, try again later'
                        },
                        'confirm': {
                            'e1': 'Failed to confirm 2FA methods, try again later'
                        }
                    }
                },
                'notifications': {
                    'confirm': {
                        'e1': 'Failed to confirm notifications, try again later'
                    },
                    'code': {
                        'e1': 'Failed to recieve code, try again later'
                    },
                    'list': {
                        'e1': 'Failed to list notifications, try again later'
                    },
                    'disable': {
                        'e1': 'Failed to disable notifications, try again later'
                    },
                    'remove': {
                        'e1': 'Failed to remove notifications, try again later'
                    },
                    'signals': {
                        'list': {
                            'e1': 'Failed to list notifications, try again later'
                        },
                        'create': {
                            'e1': 'Failed to create notifications, try again later'
                        },
                    },
                    'trades': {
                        'e1': 'Failed to create trade notifications, try again later'
                    },
                    'balance': {
                        'e1': 'Failed to create balance notifications, try again later'
                    },
                    'payment': {
                        'e1': 'Failed to create payment notifications, try again later'
                    },
                    'delete': {
                        'signals': {
                            'e1': 'Failed to delete signals notifications, try again later'
                        },
                        'trade': {
                            'e1': 'Failed to delete trade notifications, try again later'
                        },
                        'balance': {
                            'e1': 'Failed to delete balance notifications, try again later'
                        },
                        'payment': {
                            'e1': 'Failed to delete payment notifications, try again later'
                        }
                    }
                }

          

                
            }
           
        },
        'RU': {},
        'LV': {}
    }

    return language
}

module.exports = recieveLocales