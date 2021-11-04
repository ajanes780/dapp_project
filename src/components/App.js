import React, { useEffect, useState } from 'react'
import logo from '../logo.png'
import Web3 from 'web3'
import './App.css'
import Navbar from './Navbar'
import SocialNetwork from '../abis/SocialNetwork.json'

const App = () => {
  const [state, setState] = useState({
    account: '',
    socialNetwork: null,
    postCount: 0,
    posts: [],
  })

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3
    if (web3) {
      // load accounts
      const accounts = await web3.eth.getAccounts()
      setState({ account: accounts[0] })

      // Network ID
      // Network ID
      const networkId = await web3.eth.net.getId()
      const networkData = SocialNetwork.networks[networkId]
      if (networkData) {
        const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
        setState({ socialNetwork })
      } else {
        window.alert('SocialNetwork contract not deployed to detected network.')
      }
    }
  }

  return (
    <div>
      <Navbar account={state.account} />
      <div className='container-fluid mt-5'>
        <div className='row'>
          <main role='main' className='col-lg-12 d-flex text-center'>
            <div className='content mr-auto ml-auto'>
              <h2> Hello World</h2>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
