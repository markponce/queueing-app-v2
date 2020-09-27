package com.example.queueingapp

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.findNavController
import androidx.navigation.fragment.findNavController
import com.example.queueingapp.databinding.FragmentStepOneBinding
import com.example.queueingapp.databinding.FragmentStepTwoBinding
import timber.log.Timber

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

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding = DataBindingUtil.inflate<FragmentStepTwoBinding>(
            inflater,
            R.layout.fragment_step_two,
            container,
            false
        )
//        var args = StepTwoFragmentArgs.fromBundle(requireArguments())
//        Toast.makeText(context, args.testArg, Toast.LENGTH_LONG).show()

        viewModel = ViewModelProvider(this.requireActivity()).get(QueueViewModel::class.java)
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
        }

        binding.btnStepThree.setOnClickListener {
            findNavController().navigate(StepTwoFragmentDirections.actionStepTwoFragmentToStepThreeFragment())
        }

        return binding.root
    }
}