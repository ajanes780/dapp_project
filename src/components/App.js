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

      if (accounts) {
        setState((prev) => ({ ...prev, account: accounts[0] }))
      }

      // Network ID

      let socialNetwork
      let postCount
      const networkId = await web3.eth.net.getId()

      if (networkId) {
        const networkData = SocialNetwork.networks[networkId]

        if (networkData) {
          try {
            socialNetwork = await web3.eth.Contract(SocialNetwork.abi, networkData.address)
            console.log(`socialNetwork`, socialNetwork)
            setState((prev) => ({ ...prev, socialNetwork: socialNetwork }))

            // const postCount = await socialNetwork.methods.postCount().call()
            const postCount = 3
            setState((prev) => ({ ...prev, postCount: postCount }))

            console.log(` postCount`, postCount)
            for (let i = 1; i <= postCount; i++) {
              const post = await socialNetwork.methods.posts(i).call()
              console.log(`post`, post)
              if (post) {
                setState((prev) => ({ ...prev, posts: post }))
                console.log(`state`, state)
              }
            }
          } catch (error) {
            console.log('err', error)
          }
        }

        // Load Posts
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
