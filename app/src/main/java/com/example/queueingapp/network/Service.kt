package com.example.queueingapp.network

import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

//private const val BASE_URL = "http://172.29.133.223:3001"
private const val BASE_URL = "https://agile-crag-70749.herokuapp.com"

private val moshi = Moshi.Builder()
    .add(KotlinJsonAdapterFactory())
    .build()

interface QueueingService {

    @GET("services")
    suspend fun getServicesList(): List<NetworkQueueingService>

    @POST("queues")
    suspend fun createQueue(@Body postDataQueue: PostDataQueue): NetworkQueueResponseContainer

}

object QueueingNetwork {
    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(MoshiConverterFactory.create(moshi))
        .build()
    val queueing = retrofit.create(QueueingService::class.java)
}
