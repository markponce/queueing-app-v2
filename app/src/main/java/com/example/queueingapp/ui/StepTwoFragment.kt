package com.example.queueingapp.ui

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.queueingapp.R
import com.example.queueingapp.databinding.FragmentStepTwoBinding
import com.example.queueingapp.viewmodels.QueueViewModel

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [StepTwoFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class StepTwoFragment : Fragment() {

    private lateinit var viewModel : QueueViewModel

//    private val viewModel: QueueViewModel by lazy {
//        val activity = requireNotNull(this.activity) {
//            "You can only access the viewModel after onActivityCreated()"
//        }
//        ViewModelProvider(this, QueueViewModel.Factory(activity.application)).get(QueueViewModel::class.java)
//    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        (activity as AppCompatActivity).supportActionBar?.title = "Queueing - Step 2/3"

        val binding = DataBindingUtil.inflate<FragmentStepTwoBinding>(
            inflater,
            R.layout.fragment_step_two,
            container,
            false
        )


//        var args = StepTwoFragmentArgs.fromBundle(requireArguments())
//        Toast.makeText(context, args.testArg, Toast.LENGTH_LONG).show()

//        viewModel = ViewModelProvider(this.requireActivity()).get(QueueViewModel::class.java)
        viewModel = ViewModelProvider(this.requireActivity(), QueueViewModel.Factory(this.requireActivity().application)).get(QueueViewModel::class.java)

        binding.queueViewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner

//        viewModel.customerType.observe(this.viewLifecycleOwner, Observer {
//            Timber.d(it.toString())
//        })

        binding.radioGroup.setOnCheckedChangeListener { radioGroup, i ->
            when (i) {
                R.id.radio_2 -> viewModel.customerType.value = 2
                R.id.radio_3 -> viewModel.customerType.value = 3
                R.id.radio_4 -> viewModel.customerType.value = 4
                else -> { // Note the block
                    viewModel.customerType.value = 1
                }
            }
        }

        binding.btnStepOne.setOnClickListener {
            findNavController().navigate(StepTwoFragmentDirections.actionStepTwoFragmentToStepOneFragment())
//            requireActivity().onBackPressed();
        }

        binding.btnStepThree.setOnClickListener {
            findNavController().navigate(StepTwoFragmentDirections.actionStepTwoFragmentToStepThreeFragment())
        }

        return binding.root
    }
}