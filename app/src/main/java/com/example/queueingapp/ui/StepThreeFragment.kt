package com.example.queueingapp.ui

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.CheckBox
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.queueingapp.R
import com.example.queueingapp.ServicesAdapter
import com.example.queueingapp.databinding.FragmentStepThreeBinding
import com.example.queueingapp.domain.QueueService
import com.example.queueingapp.viewmodels.QueueViewModel
import com.example.queueingapp.viewmodels.ServicesStatus
import com.google.android.material.dialog.MaterialAlertDialogBuilder

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [StepThreeFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class StepThreeFragment : Fragment() {


    private lateinit var viewModel: QueueViewModel

//    private val viewModel: QueueViewModel by lazy {
//        val activity = requireNotNull(this.activity) {
//            "You can only access the viewModel after onActivityCreated()"
//        }
//        ViewModelProvider(this, QueueViewModel.Factory(activity.application)).get(QueueViewModel::class.java)
//    }

    private var toast: Toast? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        (activity as AppCompatActivity).supportActionBar?.title = "Queueing - Step 3/3"

        // Inflate the layout for this fragment
        val binding = DataBindingUtil.inflate<FragmentStepThreeBinding>(
            inflater,
            R.layout.fragment_step_three,
            container,
            false
        )
//        viewModel = ViewModelProvider(this.requireActivity()).get(QueueViewModel::class.java)

        viewModel = ViewModelProvider(this.requireActivity(), QueueViewModel.Factory(this.requireActivity().application)).get(QueueViewModel::class.java)

        viewModel.servicesStatus.observe(this.viewLifecycleOwner, Observer {
            it?.let {
                binding.swipeRefresh.isRefreshing = it == ServicesStatus.LOADING
            }
        })

        binding.queueViewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
        binding.swipeRefresh.setOnRefreshListener {
            viewModel.getServices()
        }
        binding.rvServicesList.adapter = ServicesAdapter(
            viewModel.selectedServices,
            ServicesAdapter.OnClickListener { v: View, it: QueueService ->
                val list1 = viewModel.selectedServices.value?.toMutableList()
                    ?: mutableListOf<QueueService>()
                v as CheckBox
//            Timber.d(v.isChecked.toString())
                if (v.isChecked) {
                    list1.add(it)
                } else {
                    list1.remove(it)
                }
                viewModel.setSelectedServices(list1)
            })
//        viewModel.selectedServices.observe(this.viewLifecycleOwner, Observer {
//            Timber.d(it.size.toString())
//        })
        binding.btnStepTwo.setOnClickListener {
            findNavController().navigate(StepThreeFragmentDirections.actionStepThreeFragmentToStepTwoFragment())
        }
        binding.btnSubmit.setOnClickListener {
            MaterialAlertDialogBuilder(requireContext())
                .setTitle("Submit Confirmation")
                .setMessage("Are you sure?")
                .setNegativeButton("Cancel") { dialog, which ->
                }
                .setPositiveButton("Submit") { dialog, which ->
                    viewModel.submitQueue()
                }
                .show()
        }
        viewModel.navigateToSuccessPage.observe(this.viewLifecycleOwner, Observer {
            it?.let {
                findNavController().navigate(
                    StepThreeFragmentDirections.actionStepThreeFragmentToSuccessFragment(
                        it
                    )
                )
                viewModel.displayPlaySuccessPageComplete()
            }
        })

        viewModel.message.observe(this.viewLifecycleOwner, Observer {
            it?.let {
                Toast.makeText(this.context, viewModel.message.value, Toast.LENGTH_LONG).show()
                viewModel.clearMessage()
            }
        })




        return binding.root
    }
}