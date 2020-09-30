package com.example.queueingapp.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import com.example.queueingapp.database.QueueingDb
import com.example.queueingapp.database.asDomainModel

import com.example.queueingapp.domain.QueueService
import com.example.queueingapp.network.QueueingNetwork
import com.example.queueingapp.network.QueueingService
import com.example.queueingapp.network.asDBModel
import com.example.queueingapp.network.asDomainModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import timber.log.Timber

class QueueingServicesRepository(private val database: QueueingDb) {

    val services: LiveData<List<QueueService>> = Transformations.map(
        database.qServiceDao.getServices()
    ) {
        it.asDomainModel()
    }

    suspend fun refreshServices() {
        withContext(Dispatchers.IO) {
            val services = QueueingNetwork.queueing.getServicesList()
            database.qServiceDao.insertAll(services.asDBModel())
        }
    }


}