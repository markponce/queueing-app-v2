package com.example.queueingapp.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations

import com.example.queueingapp.domain.QueueService
import com.example.queueingapp.network.QueueingNetwork
import com.example.queueingapp.network.QueueingService
import com.example.queueingapp.network.asDomainModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import timber.log.Timber

class QueueingServicesRepository() {

    private val _services = MutableLiveData<List<QueueService>>()
    val services: LiveData<List<QueueService>>
        get() = _services

    suspend fun refreshServices() {
        withContext(Dispatchers.IO) {
            _services.value = QueueingNetwork.queueing.getServicesList().asDomainModel()
        }
    }

}