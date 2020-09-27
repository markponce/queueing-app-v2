package com.example.queueingapp

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.queueingapp.domain.QueueService
import com.example.queueingapp.network.*
import kotlinx.coroutines.launch
import timber.log.Timber
import java.lang.Exception


enum class ServicesStatus { LOADING, ERROR, DONE }
enum class QueueStatus { LOADING, ERROR, DONE }

class QueueViewModel : ViewModel() {

    private val _servicesStatus = MutableLiveData<ServicesStatus>()
    val servicesStatus: LiveData<ServicesStatus>
        get() = _servicesStatus

    private val _message = MutableLiveData<String>()
    val message: LiveData<String>
        get() = _message

    private val _queueStatus = MutableLiveData<QueueStatus>()
    val queueStatus: LiveData<QueueStatus>
        get() = _queueStatus

    val name = MutableLiveData<String>()
    val customerType = MutableLiveData<Int>()

    private val _services = MutableLiveData<List<QueueService>>()
    val services: LiveData<List<QueueService>>
        get() = _services

    private val _navigateToSuccessPage = MutableLiveData<NetworkQueueResponse>()
    val navigateToSuccessPage: LiveData<NetworkQueueResponse>
        get() = _navigateToSuccessPage
    
    private val _selectedServices = MutableLiveData<List<QueueService>>()
    val selectedServices: LiveData<List<QueueService>>
        get() = _selectedServices

    fun setSelectedServices(sSelectedService: List<QueueService>) {
        _selectedServices.value = sSelectedService
    }
    
    init {
        Timber.i("TMV QueueViewModel init!")
        name.value = ""
        customerType.value = 1
        getServices()
    }

    fun getServices() {
        _servicesStatus.value = ServicesStatus.LOADING
        viewModelScope.launch {
            try {
                val service = QueueingNetwork.queueing.getServicesList()
                _services.value = service?.asDomainModel()
                Timber.d("getServices success!")
                _servicesStatus.value = ServicesStatus.DONE
            } catch (e: Exception) {
                Timber.d("getServices error: ${e.message}")
                _servicesStatus.value = ServicesStatus.ERROR
                _message.value = e.message
            }
        }
    }

    fun submitQueue() {
        _queueStatus.value = QueueStatus.LOADING
        viewModelScope.launch {
            try {
                val queue = PostDataQueue(
                    customerName = name.value ?: "",
                    customerType = customerType.value ?: 1,
                    services = selectedServices.value ?: listOf<QueueService>()
                )
                val networkQueueResponseContainer = QueueingNetwork.queueing.createQueue(queue)
                displayPlaySuccessPage(networkQueueResponseContainer.queue)
                Timber.d("createQueue success!")
                _queueStatus.value = QueueStatus.DONE
            } catch (e: Exception) {
                Timber.d("createQueue error: ${e.message}")
                _queueStatus.value = QueueStatus.DONE
                _message.value = e.message
            }
        }
    }

    fun clearMessage() {
        _message.value = null
    }


    fun displayPlaySuccessPage(networkQueueResponse: NetworkQueueResponse) {
        _navigateToSuccessPage.value = networkQueueResponse
    }

    fun displayPlaySuccessPageComplete() {
        _navigateToSuccessPage.value = null
        clearFormValues()
    }


    override fun onCleared() {
        super.onCleared()
        Timber.i("TMV QueueViewModel destroyed!")
    }

    private fun clearFormValues() {
        name.value = ""
        customerType.value = 1
        _selectedServices.value = listOf<QueueService>()
    }
}