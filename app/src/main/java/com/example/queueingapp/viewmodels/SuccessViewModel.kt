package com.example.queueingapp.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.queueingapp.network.NetworkQueueResponse
import timber.log.Timber

class SuccessViewModel(val networkQueueResponse: NetworkQueueResponse) : ViewModel() {

    private val _queue = MutableLiveData<NetworkQueueResponse>()
    val queue: LiveData<NetworkQueueResponse>
        get() = _queue


    init {
        Timber.i("TMV SuccessViewModel init!")
        _queue.value = networkQueueResponse
    }

    fun successPageFinished() {
        _queue.value = null
    }



    override fun onCleared() {
        Timber.i("TMV SuccessViewModel destroyed!")

        super.onCleared()
    }


    class Factory(private val networkQueueResponse: NetworkQueueResponse) :
        ViewModelProvider.Factory {
        override fun <T : ViewModel?> create(modelClass: Class<T>): T {
            if (modelClass.isAssignableFrom(SuccessViewModel::class.java)) {
                @Suppress("UNCHECKED_CAST")
                return SuccessViewModel(networkQueueResponse) as T
            }
            throw IllegalArgumentException("Unable to construct viewmodel")
        }
    }
}